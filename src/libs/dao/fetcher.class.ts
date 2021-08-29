import { 
  ApolloClient, 
  NormalizedCacheObject, 
  ApolloQueryResult, gql 
} from "@apollo/client"; 


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


export class Fetcher {
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  }

  public async Read(modelName:string, ids?:string[]) { 
    const subfield = gql`{title}` 

    const READ = gql` 
      query Read($ids: [String!]) { 
        Read${modelName}(ids:$ids) { 
          items ${subfield} 
        } 
      }` 

    const variables = {ids}; 
    return await this.client.query({ 
      query:READ, variables}) 
    .then( res => res.data ) 
    .catch( err => err ) 
  } 

  public async Test() { 
    const model = 'Form'; 
    const subfield = gql`{title}` 
    
    const MODEL = gql` 
      query Read($ids: [String!]) { 
        Read${model}(ids:$ids) { 
          items ${subfield} 
        } 
      }` 

    const variables = {ids:undefined} 
    return await this.client.query({ 
      query:MODEL, variables}) 
    .then( res => res.data ) 
    .catch( err => err ) 
  } 

  // MODEL ..................................................
  public async Model(variables:{modelsName:string[]}) { 
    return await this.client.query({ 
      query:request.MODEL, variables}) 
    .then( res => res.data ) 
    .catch( err => err ) 
  }

  // READ ..................................................
  /*public async Read(modelName:string, ids?:string[]) { 
    return await this.client.query({
      query:request.M
    })
  }*/

  // READ ..................................................
  // public async Read(variables:{modelName:string, ids?:string[]}) { 
  //   const result = await this.client.query({query:request.READ, variables}) 
  //   return result.data.Read; 
  //     // .then( res => res.data.items as IEntry[] ) 
  //     // .catch( err => err ) 
  // } 

  // CREATE ................................................
  public async Create(variables:{modelName:string, inputs:object}) { 
    return await this.client.mutate({ 
      mutation:request.CREATE, variables}) 
      .then( res => res.data.items as IEntry[]) 
      .catch( err => err ) 
  } 

  // UPDATE ...............................................
  public async Update(variables:{modelName:string, inputs:object}) { 
    return await this.client.mutate({ 
      mutation:request.UPDATE, variables}) 
      .then( res => res.data.items as IEntry[]) 
      .catch( err => err ) 
  } 

  // DELETE ................................................
  public async Delete(variables:{modelName:string, ids?:string[]}) { 
    return await this.client.mutate({ 
      mutation:request.DELETE, variables}) 
      .then( res => res.data.items as IEntry[]) 
      .catch( err => err ) 
  }
} 
  