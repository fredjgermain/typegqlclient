import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 


// -------------------------------------------------------- 
import * as request from './gql'; 
import { 
  ParseModelDescriptors, ParseCrudResult, ReduceSubfields, 
  ArgsIds, ArgsInputs, ArgsModelDescriptors, ArgsModelName, 
  ModelDescriptor, CrudResult 
} from './dao.utils'; 
import { IsEmpty } from "../utils/value_type.utils"; 


export class CrudError extends Error { 
  public errors: any[]; 

  constructor(errors:any[]) { 
    super('') 
    this.errors = errors; 
  }
}



export class Fetcher {
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  } 

  // MODEL .................................................. 
  public async ModelDescriptors({subfields, modelsName}:ArgsModelDescriptors) { 
    const defaultSubfields = ["_id accessor label description ifields"]; 
    const query = request.MODELDESCRIPTORS( ReduceSubfields(subfields, defaultSubfields) ); 
    const variables = {modelsName}; 
    return this.client.query({query, variables}) 
      .then( res => ParseModelDescriptors(res.data) ) 
      .catch( err => err ) 
  } 

  // VALIDATE .................................................
  public async Validate({modelName, subfields, inputs}:ArgsInputs) { 
    const query = request.VALIDATE(modelName); 
    const variables = {inputs}; 

    return this.client.query({query, variables}) 
    .then( res => res.data ) 
    .catch( err => err ) 
  }

  // READ ..................................................
  public async Create({modelName, subfields, inputs}:ArgsInputs) { 
    const reducedSubfields = await this.GetReducedSubfields({modelName, subfields}); 
    const mutation = request.CREATE(modelName, reducedSubfields); 
    const variables = {inputs}; 

    const {items, errors} = await this.client.mutate({mutation, variables}) 
      .then( res => ParseCrudResult(res.data) ) 
      .catch( err => { return {items:[], errors:[err]}} ) 

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
      .catch( err => { return {items:[], errors:[err]}} ) 

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
      .catch( err => { return {items:[], errors:[err]}} ) 

    if(!IsEmpty(errors)) 
      throw new CrudError(errors); 
    return items; 
  } 

  // UPDATE .................................................
  public async Delete({modelName, subfields, ids}:ArgsIds) { 
    const reducedSubfields = await this.GetReducedSubfields({modelName, subfields}); 
    const mutation = request.DELETE(modelName, reducedSubfields); 
    const variables = {ids}; 

    const {items, errors} = await this.client.mutate({mutation, variables}) 
      .then( res => ParseCrudResult(res.data) ) 
      .catch( err => { return {items:[], errors:[err]}} ) 

    if(!IsEmpty(errors)) 
      throw new CrudError(errors); 
    return items; 
  } 



  // GetSubfields -----------------------------------------
  private async GetReducedSubfields({modelName, subfields}:ArgsModelName) { 
    const defaultSubfields = await this.GetDefaultSubfields(modelName); 
    return ReduceSubfields(subfields, defaultSubfields); 
  }

  private async GetDefaultSubfields(modelName:string) { 
    const models = await this.ModelDescriptors({modelsName:[modelName]}); 
    const subfields = (models[0] as ModelDescriptor)?.ifields.filter( f => f.accessor != '__v'); 
    return subfields?.map( f => f.accessor) ?? ["_id"]; 
  }
}
  