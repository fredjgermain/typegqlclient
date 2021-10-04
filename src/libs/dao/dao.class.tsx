import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 



// -------------------------------------------------------- 
import * as request from './gql'; 
import { 
  ParseModelDescriptors, ParseTypeIntrospection, ParseEntries, 
  ReduceSubfields, 
  ArgsIds, ArgsInputs, ArgsModelDescriptors, ArgsModelName, 
  ModelDescriptor, 
} from './dao.utils'; 
import { Cacher } from './cacher.class'; 


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
  private cacher:Cacher; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
    this.cacher = new Cacher(client);
  } 

  // GetSubfields -----------------------------------------
  private async GetReducedSubfields({modelName, subfields}:ArgsModelName) { 
    const defaultSubfields = await this.IntrospectSubfields(modelName); 
    return ReduceSubfields(subfields, defaultSubfields); 
  }

  private async IntrospectSubfields(modelName:string) { 
    const models = await this.ModelDescriptors({modelsName:[modelName]}); 
    const ifields = (models[0] as ModelDescriptor)?.ifields; 

    const introspection = await (this.TypeIntrospection(modelName)) 
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
  public GetDefaultEntry(model:ModelDescriptor):IEntry { 
    return this.cacher.GetDefaultEntry(model); 
  } 

  // Get Options ..........................................
  public GetOptionsFromModel(model:IModel) { 
    return this.cacher.GetOptionsFromModel(model); 
  }

  public GetOptionsFromIField(ifield:IField):IOption[] { 
    return this.cacher.GetOptionsFromIField(ifield); 
  } 

} 

