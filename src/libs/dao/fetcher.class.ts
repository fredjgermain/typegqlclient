import { ApolloClient, NormalizedCacheObject, ApolloQueryResult } 
  from "@apollo/client"; 


// -------------------------------------------------------- 
import * as request from './gql'; 


type IError = object; 

export function ParseItemsErrors(result:ApolloQueryResult<any>):IEntry[]|IError[] { 
  console.log(result); 

  const [parsedresults] = Object.values(result.data); 
  const {items, errors} = parsedresults as {items:IEntry[], errors?:IError[]}; 
  if(!!errors && errors.length > 0) 
    return errors; 
  return items; 
}


export function ParseCrudResult(crudresult:any) { 
  const [results] = Object.values(crudresult) as {items:any[], errors:any[]}[]; 
  
  return results; 
}


export class Fetcher {
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  } 

  // MODEL .................................................. 
  public async ModelDescriptors(subfields:string, modelsName?:string[]) { 
    const query = request.MODELDESCRIPTORS(`{${subfields}}`); 
    const variables = {modelsName}; 
    return this.client.query({query, variables}) 
    .then( res => res.data["ModelDescriptors"] ) 
    .catch( err => err ) 
  } 

  // VALIDATE .................................................
  public async Validate(modelName:string, inputs:any[]) { 
    const query = request.VALIDATE(modelName); 
    const variables = {inputs}; 
    return this.client.query({query, variables}) 
    .then( res => res.data ) 
    .catch( err => err ) 
  }

  // READ ..................................................
  public async Create(modelName:string, subfields:string, inputs:any[]) { 
    const mutation = request.CREATE(modelName, `{${subfields}}`); 
    const variables = {inputs}; 
    return this.client.mutate({mutation, variables}) 
    .then( res => ParseCrudResult(res.data) ) 
    .catch( err => err)
  } 

  // READ .................................................
  public async Read(modelName:string, subfields:string, ids?:any[]) { 
    const query = request.READ(modelName, `{${subfields}}`); 
    const variables = {ids}; 
    return this.client.query({query, variables}) 
    .then( res => ParseCrudResult(res.data) ) 
    .catch( err => err ) 
  } 

  // UPDATE .................................................
  public async Update(modelName:string, subfields:string, inputs:any[]) { 
    const mutation = request.UPDATE(modelName, `{${subfields}}`); 
    const variables = {inputs}; 
    return this.client.mutate({mutation, variables}) 
    .then( res => ParseCrudResult(res.data) ) 
    .catch( err => err ) 
  } 

  // UPDATE .................................................
  public async Delete(modelName:string, subfields:string, ids?:any[]) { 
    const mutation = request.DELETE(modelName, `{${subfields}}`); 
    const variables = {ids}; 
    return this.client.mutate({mutation, variables}) 
    .then( res => ParseCrudResult(res.data) ) 
    .catch( err => err ) 
  } 
}
  