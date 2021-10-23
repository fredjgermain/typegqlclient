import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 



// -------------------------------------------------------- 
import * as request from './gql'; 
import { 
  ParseModelDescriptors, ParseTypeIntrospection, ParseEntries, 
  ReduceSubfields, 
  ArgsIds, ArgsInputs, ArgsModelDescriptors, ArgsModelName, 
} from './dao.utils'; 
import { GetDefaultValue, IsEmpty } from "../utils/utils"; 


export enum EnumCrud { 
  Create = 'Create', 
  Read = 'Read', 
  Update = 'Update', 
  Delete = 'Delete', 
}

type FetchingArgs = {action:EnumCrud, modelName:string, subfields?:string[], variables:any} 


export class CrudError extends Error { 
  public errors: any[]; 

  constructor(errors:any[]) { 
    super('') 
    this.errors = errors; 
  }
}

type TIntrospect = { 
  name: string, 
  fields: {name: string} [] 
} 


// Complete each methods to map it to the Apollo clients functions etc. 
export class Dao { 
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  } 

  // GetSubfields -----------------------------------------
  private async GetReducedSubfields({modelName, subfields}:ArgsModelName) { 
    const [model] = await this.ModelDescriptors({modelsName:[modelName]}); 
    const defaultSubfields = await this.IntrospectSubfields(model); 
    return ReduceSubfields(subfields, defaultSubfields); 
  } 

  private async IntrospectSubfields(model:IModel):Promise<string[]> { 
    const {accessor, ifields} = model; 
    const introspection = await (this.TypeIntrospection(accessor)) 
    // Returns nested subfields in case of a nested field
    return introspection.fields.map( field => { 
      const ifield = ifields.find( f => f.accessor === field.name ); 
      return ifield?.isRef ? `${field.name} {_id}` : field.name 
    }) ?? ['_id'] as string[]; 
  } 

  // TypeInstrospection ......................................
  public async TypeIntrospection(name:string):Promise<TIntrospect> { 
    const query = request.Type(); 
    const variables = {name}; 
    try{ 
      const res = await this.client.query({query, variables}) 
      return ParseTypeIntrospection(res.data); 
    }catch(err) { 
      throw err; 
    } 
  } 

  // MODEL .................................................. 
  public async ModelDescriptors({subfields, modelsName}:ArgsModelDescriptors) { 
    const defaultSubfields = ["_id accessor label description ifields"]; 
    const query = request.ModelDescriptors( ReduceSubfields(subfields, defaultSubfields) ); 
    const variables = {modelsName}; 

    try { 
      const res = await this.client.query({query, variables}) 
      return ParseModelDescriptors(res.data); 
    } catch(err) { 
      throw err; 
    } 
  } 

  // VALIDATE .................................................
  public async Validate({modelName, subfields, inputs}:ArgsInputs) { 
    const query = request.Validate(modelName); 
    const variables = {inputs}; 

    return this.client.query({query, variables}) 
    .then( res => res.data ) 
    .catch( err => err ) 
  }
  
  // READ .................................................
  public async Read({modelName, subfields, ids}:ArgsIds) { 
    const reducedSubfields = await this.GetReducedSubfields({modelName, subfields}); 
    const query = request.Read(modelName, reducedSubfields); 
    const variables = {ids}; 
    
    try{ 
      const res = await this.client.query({query, variables}) 
      return ParseEntries(res.data) 
    } catch(err) { 
      throw err; 
    }
  } 


  // Mutation ..................................................
  private async Mutation({action, modelName, subfields, variables}:FetchingArgs) { 
    const reducedSubfields = await this.GetReducedSubfields({modelName, subfields}); 
    const mutation = (request as any)[action](modelName, reducedSubfields); 
    
    try { 
      const res = await this.client.mutate({mutation, variables})
      const inputs = ParseEntries( res.data ); 

      // Use this line if removing 'network-only' query policy 
      //this.cacher[action]({modelName, inputs}); 

      return inputs; 
    } catch(err) { 
      throw err; 
    } 
  }



  // CREATE ..................................................
  public async Create({modelName, subfields, inputs}:ArgsInputs) { 
    const action = EnumCrud.Create; 
    const variables = {inputs:inputs.map( i => { 
      const {_id, ...input} = i; 
      return input; 
    })}; 
    return await this.Mutation({action, modelName, subfields, variables}); 
  }

  // Update ..................................................
  public async Update({modelName, subfields, inputs}:ArgsInputs) { 
    const action = EnumCrud.Update; 
    const variables = {inputs}; 
    return await this.Mutation({action, modelName, subfields, variables}); 
  }

  // Delete ..................................................
  public async Delete({modelName, subfields, ids}:ArgsIds) { 
    const action = EnumCrud.Delete; 
    const variables = {ids}; 
    return await this.Mutation({action, modelName, subfields, variables}); 
  }

  // Get Default Entry ....................................
  public GetDefaultEntry(model:IModel):IEntry { 
    const ifields = model.ifields.filter( f => f.options?.readable || f.options?.editable ); 
    let defaultEntry = {} as IEntry; 
    ifields.forEach( f => defaultEntry[f.accessor] = f.type.defaultValue ?? GetDefaultValue(f.type.name) ) 
    return defaultEntry; 
  } 

  // Get Options ..........................................
  public async GetOptionsFromModel(model:IModel) { 
    const ifields = model.ifields ?? []; 
    let options = {} as {[key:string]:IOption[]} 
    for(let i=0; i < ifields.length; i++) { 
      const ifield = ifields[i]; 
      options[ifield.accessor] = await this.GetOptionsFromIField(ifield); 
    } 
    return options; 
  }

  public async GetOptionsFromIField(ifield:IField):Promise<IOption[]> { 
    if(ifield.isRef) {
      const modelName = ifield.options?.ref ?? ''; 
      const [model] = await this.ModelDescriptors({modelsName:[modelName]}); 
      if(IsEmpty(model)) return []; 
      return await this.GetOptionsFromRef(model); 
    }
    // Get Options from Enums 
    const enums = ifield.type.enums ?? []; 
    return enums.map( e => { 
      return {value:e, label:e} as IOption; 
    }) 
  }

  public async GetOptionsFromRef(model:IModel):Promise<IOption[]> { 
    const abbrevSubfield = await this.GetAbbrevIField(model); 
    const modelName = model.accessor; 
    let subfields = abbrevSubfield === '_id' ? [] : [abbrevSubfield]; 
    subfields = ['__typename', '_id', ...subfields]; 
    const entries = await this.Read({modelName, subfields}); 
    const options = entries.map( entry => { 
      const {__typename, _id} = entry; 
      return {value:{__typename, _id}, label:entry[abbrevSubfield]} as IOption; 
    }) 
    return options;
  } 

  public async GetAbbrevIField(model:IModel):Promise<string> { 
    const defaultSubfields = await this.IntrospectSubfields(model); 
    const abbrevSubfield = defaultSubfields.find( f => f === 'abbrev') ?? 
      model.ifields.find( e => e.type.name === 'string' && !e.accessor.includes('_') )?.accessor ?? 
      model.ifields.find( e => e.type.name === 'number' && !e.accessor.includes('_') )?.accessor ?? 
      '_id'; 
    return abbrevSubfield; 
  }

} 

