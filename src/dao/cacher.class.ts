import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 



// ---------------------------------------------------------
import * as request from './gql'; 
import { 
  ParseModelDescriptors,  
  ParseTypeIntrospection, ParseEntries, 
  ReduceSubfields, 
  ArgsIds, ArgsModelDescriptors, ArgsModelName, 
  ModelDescriptor, 
} from './dao.utils'; 
import { GetDefaultValue } from "../utils/utils"; 



type TIntrospect = { 
  name: string, 
  fields: {name: string} [] 
} 


export class Cacher{ 
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  } 

  
  // GetSubfields -----------------------------------------
  public GetReducedSubfields({modelName, subfields}:ArgsModelName) { 
    const defaultSubfields = this.IntrospectSubfields(modelName); 
    return ReduceSubfields(subfields, defaultSubfields); 
  }


  private IntrospectSubfields(modelName:string) { 
    
    const models = this.ModelDescriptors({modelsName:[modelName]}); 
    const ifields = (models[0] as ModelDescriptor)?.ifields; 

    const introspection = (this.TypeIntrospection(modelName)) 
    return introspection.fields.map( field => { 
      const ifield = ifields.find( f => f.accessor === field.name ); 
      return ifield?.isRef ? `${field.name} {_id}` : field.name 
    }) ?? ['_id'] as string[]; 
  } 


  // TypeInstrospection ......................................
  public TypeIntrospection(name:string):TIntrospect { 
    const query = request.Type(); 
    const variables = {name}; 
    try{ 
      const res = this.client.readQuery({query, variables}) 
      return ParseTypeIntrospection(res); 
    }catch(err) { 
      throw err; 
    }
  }

  
  // MODEL .................................................. 
  public ModelDescriptors({subfields, modelsName}:ArgsModelDescriptors) { 
    const defaultSubfields = ["_id accessor label description ifields"]; 
    const query = request.ModelDescriptors( ReduceSubfields(subfields, defaultSubfields) ); 
    const variables = {modelsName}; 

    try {
      console.log(this.client.cache); 
      const res = this.client.readQuery({query, variables}) 
      console.log(res); 
      return ParseModelDescriptors(res); 
    } catch(err) { 
      throw err; 
    } 
  } 
  
  private ReadQuery({modelName, subfields}:{modelName:string, subfields?:string[]}) { 
    const reducedSubfields = this.GetReducedSubfields({modelName, subfields}); 
    return request.Read(modelName, reducedSubfields); 
  } 

  // CREATE ..................................................
  public Create({modelName, inputs}:{modelName:string, inputs:IEntry[]}) { 
    const query = this.ReadQuery({modelName}); 
    const existing = this.Read({modelName}); 
    const entries = [...existing, ...inputs]; 

    const data = {[`Read${modelName}`]:entries} 
    return this.client.cache.writeQuery({query, data}); 
  } 

  // READ ------------------------------------------------- 
  public Read({modelName, subfields, ids}:ArgsIds) { 
    const query = this.ReadQuery({modelName, subfields}); 
    return ParseEntries( this.client.cache.readQuery({query}) ); 
  } 

  // UPDATE ..................................................
  public Update({modelName, inputs}:{modelName:string, inputs:IEntry[]}) { 
    const query = this.ReadQuery({modelName}); 
    const existing = this.Read({modelName}); 
    const entries = existing.map( e => inputs.find( i => i._id === e._id ) ?? e ); 

    const data = {[`Read${modelName}`]:entries}; 
    return this.client.cache.writeQuery({query, data}); 
  } 

  // DELETE ..................................................
  public Delete({modelName, inputs}:{modelName:string, inputs:IEntry[]}) { 
    const query = this.ReadQuery({modelName}); 
    const existing = this.Read({modelName}); 
    const ids = inputs.map( i => i._id); 
    const entries = existing.filter( e => ids.find( i => i != e._id ) ); 

    const data = {[`Read${modelName}`]:entries}; 
    return this.client.cache.writeQuery({query, data}); 
  } 


  // Get Default Entry ....................................
  public GetDefaultEntry(model:IModel):IEntry { 
    const ifields = model.ifields.filter( f => f.options?.readable || f.options?.editable ); 
    let defaultEntry = {} as IEntry; 
    ifields.forEach( f => defaultEntry[f.accessor] = f.type.defaultValue ?? GetDefaultValue(f.type.name) ) 
    return defaultEntry; 
  }


  public GetOptionsFromModel(model:IModel) { 
    const ifields = model.ifields ?? []; 
    let options = {} as {[key:string]:IOption[]} 
    for(let i=0; i < ifields.length; i++) { 
      const ifield = ifields[i]; 
      options[ifield.accessor] = this.GetOptionsFromIField(ifield); 
    } 
    return options; 
  }

  // Get Options ..........................................
  public GetOptionsFromIFields(ifields:IField[]):{[accessor:string]:IOption[]} { 
    let options = {} as {[key:string]:IOption[]} 
    for(let i=0; i < ifields.length; i++) { 
      const ifield = ifields[i]; 
      options[ifield.accessor] = this.GetOptionsFromIField(ifield); 
    } 
    return options; 
  }

  public GetOptionsFromIField(ifield:IField):IOption[] { 
    if(ifield.isRef) 
      return this.GetOptionsFromRef(ifield.options?.ref ?? ''); 
    
    // Get Options from Enums 
    const enums = ifield.type.enums ?? []; 
    return enums.map( e => { 
      return {value:e, label:e} as IOption; 
    }) 
  }

  public GetOptionsFromRef(modelName:string):IOption[] { 
    let entries = [] as IEntry[]; 
    // subfield 'Abbrev' may not be available ... 
    try { 
      entries = this.Read({modelName, subfields:['_id', 'abbrev']}); 
    } catch(err) { 
      entries = this.Read({modelName, subfields:['_id']}); 
    } 
    console.log(entries); 
    return entries.map( entry => { 
      return {value:entry._id, label:entry.abbrev} as IOption; 
    }) 
  } 

  
}