import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

enum EnumMutation {
  Create = 'Create', 
  Update = 'Update', 
  Delete = 'Delete',  
}

type MutationArgs = {action:EnumMutation, modelName:string, subfields?:string[], variables:any} 


// -------------------------------------------------------- 
import * as request from './gql'; 
import { 
  ParseModelDescriptors, ParseCrudResult, ParseTypeIntrospection, 
  ReduceSubfields, 
  ArgsIds, ArgsInputs, ArgsModelDescriptors, ArgsModelName, 
  ModelDescriptor, 
} from './dao.utils'; 
import { IsEmpty } from "../utils"; 
import { Cacher } from './cacher.class'; 


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
  
  // READ .................................................
  public async Read({modelName, subfields, ids}:ArgsIds) { 
    const reducedSubfields = this.cacher.GetReducedSubfields({modelName, subfields}); 
    const query = request.READ(modelName, reducedSubfields); 
    const variables = {ids}; 

    const {items, errors} = await this.client.query({query, variables}) 
      .then( res => ParseCrudResult(res.data) ) 
      .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

    if(!IsEmpty(errors)) 
      throw new CrudError(errors); 
    return items; 
  } 

  private async Mutation({action, modelName, subfields, variables}:MutationArgs) { 
    const reducedSubfields = this.cacher.GetReducedSubfields({modelName, subfields}); 
    const mutation = (request as any)[action](modelName, reducedSubfields); 
    
    const {items, errors} = await this.client.mutate({mutation, variables}) 
      .then( res => { 
        const {items, errors} = ParseCrudResult(res.data); 
        this.cacher[action]({modelName, inputs:items}); 
        return {items, errors} 
      }) 
      .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

    if(!IsEmpty(errors)) 
      throw new CrudError(errors); 
    return items; 
  }

  // CREATE ..................................................
  public async Create({modelName, subfields, inputs}:ArgsInputs) { 
    const action = EnumMutation.Create; 
    const variables = {inputs:inputs.map( i => { 
      const {_id, ...input} = i; 
      return input; 
    })}; 
    return await this.Mutation({action, modelName, subfields, variables}); 
  }

  // Update ..................................................
  public async Update({modelName, subfields, inputs}:ArgsInputs) { 
    const action = EnumMutation.Update; 
    const variables = {inputs}; 
    return await this.Mutation({action, modelName, subfields, variables}); 
  }

  // Delete ..................................................
  public async Delete({modelName, subfields, ids}:ArgsIds) { 
    const action = EnumMutation.Delete; 
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




  // public async Create({modelName, subfields, inputs}:ArgsInputs) { 
  //   const reducedSubfields = this.cacher.GetReducedSubfields({modelName, subfields}); 
  //   const mutation = request.CREATE(modelName, reducedSubfields); 
  //   const variables = {inputs:inputs.map( i => { 
  //     const {_id, ...input} = i; 
  //     return input; 
  //   })}; 

  //   const {items, errors} = await this.client.mutate({mutation, variables}) 
  //     .then( res => ParseCrudResult(res.data) ) 
  //     .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

  //   if(!IsEmpty(errors)) 
  //     throw new CrudError(errors); 
  //   return items; 
  // } 


  // // UPDATE .................................................
  // public async Update({modelName, subfields, inputs}:ArgsInputs) { 
  //   const reducedSubfields = this.cacher.GetReducedSubfields({modelName, subfields}); 
  //   const mutation = request.UPDATE(modelName, reducedSubfields); 
  //   const variables = {inputs}; 

  //   const {items, errors} = await this.client.mutate({mutation, variables}) 
  //     .then( res => ParseCrudResult(res.data) ) 
  //     .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

  //   if(!IsEmpty(errors)) 
  //     throw new CrudError(errors); 
  //   return items; 
  // } 

  // // DELETE .................................................
  // public async Delete({modelName, subfields, ids}:ArgsIds) { 
  //   const reducedSubfields = this.cacher.GetReducedSubfields({modelName, subfields}); 
  //   const mutation = request.DELETE(modelName, reducedSubfields); 
  //   const variables = {ids}; 

  //   const {items, errors} = await this.client.mutate({mutation, variables}) 
  //     .then( res => ParseCrudResult(res.data) ) 
  //     .catch( err => { return {items:[] as IEntry[], errors:[err]}} ) 

  //   if(!IsEmpty(errors)) 
  //     throw new CrudError(errors); 
  //   return items; 
  // } 
