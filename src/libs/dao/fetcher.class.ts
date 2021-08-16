import { 
  ApolloClient, 
  NormalizedCacheObject, 
} from "@apollo/client";


// -------------------------------------------------------- 
import { TEST, MODEL, VALIDATE, CREATE, READ, UPDATE, DELETE,  } from './gql'; 



export class Fetcher {
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  }

  public async Test(variables:{modelName:string}) { 
    return await this.client.query({ 
      query:TEST, variables}) 
    .then( res => res.data ) 
    .catch( err => err ) 
  }

  // MODEL ..................................................
  public async Model(variables:{modelName:string}) { 
    return await this.client.query({ 
      query:MODEL, variables}) 
    .then( res => res.data.Model as IModel ) 
    .catch( err => err ) 
  }

  // READ ..................................................
  public async Read(variables:{modelName:string, ids?:string[]}) { 
    const result = await this.client.query({query:READ, variables}) 
    return result.data.Read; 
      // .then( res => res.data.items as IEntry[] ) 
      // .catch( err => err ) 
  } 

  // CREATE ................................................
  public async Create(variables:{modelName:string, inputs:object}) { 
    return await this.client.mutate({ 
      mutation:CREATE, variables}) 
      .then( res => res.data.items as IEntry[]) 
      .catch( err => err ) 
  } 

  // UPDATE ...............................................
  public async Update(variables:{modelName:string, inputs:object}) { 
    return await this.client.mutate({ 
      mutation:UPDATE, variables}) 
      .then( res => res.data.items as IEntry[]) 
      .catch( err => err ) 
  } 

  // DELETE ................................................
  public async Delete(variables:{modelName:string, ids?:string[]}) { 
    return await this.client.mutate({ 
      mutation:DELETE, variables}) 
      .then( res => res.data.items as IEntry[]) 
      .catch( err => err ) 
  }
} 
  