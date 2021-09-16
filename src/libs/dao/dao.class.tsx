import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 


// -------------------------------------------------------- 
import * as request from './gql'; 
import { 
  ParseModelDescriptors, ParseCrudResult, ParseTypeIntrospection, 
  ReduceSubfields, 
  ArgsIds, ArgsInputs, ArgsModelDescriptors, ArgsModelName, 
  ModelDescriptor, 
} from './dao.utils'; 
import { IsEmpty } from "../utils"; 



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

  // TypeInstrospection ......................................
  public async TypeIntrospection(name:string):Promise<TIntrospect> { 
    const query = request.TYPE(); 
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
    const query = request.MODELDESCRIPTORS( ReduceSubfields(subfields, defaultSubfields) ); 
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
    const query = request.VALIDATE(modelName); 
    const variables = {inputs}; 

    return this.client.query({query, variables}) 
    .then( res => res.data ) 
    .catch( err => err ) 
  }

  // CREATE ..................................................
  public async Create({modelName, subfields, inputs}:ArgsInputs) { 
    const reducedSubfields = await this.GetReducedSubfields({modelName, subfields}); 
    const mutation = request.CREATE(modelName, reducedSubfields); 
    const variables = {inputs}; 

    const {items, errors} = await this.client.mutate({mutation, variables}) 
      .then( res => ParseCrudResult(res.data) ) 
      .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

    if(!IsEmpty(errors)) 
      throw new CrudError(errors); 
    return items; 
  } 

  // READ .................................................
  public async Read({modelName, subfields, ids}:ArgsIds) { 
    const reducedSubfields = await this.GetReducedSubfields({modelName, subfields}); 
    const query = request.READ(modelName, reducedSubfields); 
    const variables = {ids}; 

    const {items, errors} = await this.client.query({query, variables}) 
      .then( res => ParseCrudResult(res.data) ) 
      .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

    if(!IsEmpty(errors)) 
      throw new CrudError(errors); 
    return items; 
  } 

  // UPDATE .................................................
  public async Update({modelName, subfields, inputs}:ArgsInputs) { 
    const reducedSubfields = await this.GetReducedSubfields({modelName, subfields}); 
    const mutation = request.UPDATE(modelName, reducedSubfields); 
    const variables = {inputs}; 

    const {items, errors} = await this.client.mutate({mutation, variables}) 
      .then( res => ParseCrudResult(res.data) ) 
      .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

    if(!IsEmpty(errors)) 
      throw new CrudError(errors); 
    return items; 
  } 

  // DELETE .................................................
  public async Delete({modelName, subfields, ids}:ArgsIds) { 
    const reducedSubfields = await this.GetReducedSubfields({modelName, subfields}); 
    const mutation = request.DELETE(modelName, reducedSubfields); 
    const variables = {ids}; 

    const {items, errors} = await this.client.mutate({mutation, variables}) 
      .then( res => ParseCrudResult(res.data) ) 
      .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

    if(!IsEmpty(errors)) 
      throw new CrudError(errors); 
    return items; 
  } 


  // Get Default Entry ....................................
  public GetDefaultEntry(model:ModelDescriptor):IEntry { 
    const ifields = model.ifields.filter( f => !['_id', '_v'].includes(f.accessor) ); 
    let defaultEntry = {} as IEntry; 
    ifields.forEach( f => defaultEntry[f.accessor] = f.type.defaultValue ) 
    return defaultEntry; 
  }


  // Get Options ..........................................
  public async GetOptionsFromIFields(ifields:IField[]):Promise<{[accessor:string]:IOption[]}> { 
    let options = {} as {[accessor:string]:IOption[]} 
    for(let i=0; i < ifields.length; i++) { 
      const ifield = ifields[i]; 
      options[ifield.accessor] = await this.GetOptionsFromIField(ifield); 
    } 
    return options; 
  }

  public async GetOptionsFromIField(ifield:IField):Promise<IOption[]> { 
    if(ifield.isRef) 
      return this.GetOptionsFromRef(ifield.options?.ref); 
    
    // Get Options from Enums 
    const enums = ifield.type.enums ?? []; 
    return enums.map( e => { 
      return {value:e, label:e} as IOption; 
    }) 
  }

  public async GetOptionsFromRef(modelName:string):Promise<IOption[]> { 
    let entries = [] as IEntry[]; 
    // subfield 'Abbrev' may not be available ... 
    try { 
      entries = await this.Read({modelName, subfields:['_id', 'abbrev']}); 
    } catch(err) { 
      entries = await this.Read({modelName, subfields:['_id']}); 
    } 
    return entries.map( entry => { 
      return {value:entry._id, label:entry.abbrev} as IOption; 
    }) 
  } 

  

  // GetSubfields -----------------------------------------
  private async GetReducedSubfields({modelName, subfields}:ArgsModelName) { 
    const defaultSubfields = await this.IntrospectSubfields(modelName); 
    return ReduceSubfields(subfields, defaultSubfields); 
  }


  private async IntrospectSubfields(modelName:string) { 
    const models = await this.ModelDescriptors({modelsName:[modelName]}); 
    const ifields = (models[0] as ModelDescriptor)?.ifields; 

    const introspection = (await this.TypeIntrospection(modelName)) 
    return introspection.fields.map( field => { 
      const ifield = ifields.find( f => f.accessor === field.name ); 
      return ifield?.isRef ? `${field.name} {_id}` : field.name 
    }) ?? ['_id'] as string[]; 
  } 
} 
