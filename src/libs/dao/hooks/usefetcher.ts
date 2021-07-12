import { IModel } from '../../ifield.interface'; 
import { QUERY_MODEL, QUERY_READ } from '../gql'; 
import { client } from '../../apolloclient'; 


export function useFetcher() { 
  async function Model(modelName:string) { 
    return await client.query({ 
      query:QUERY_MODEL, 
      variables: { // Provide any required variables here 
        modelName, 
      } 
    }) 
    .then( res => res.data.Model as IModel ) 
    .catch( err => err ) 
  }

  // Read, Cache / Fetch 
  async function Read(modelName:string) { 
    return await client.query({ 
      query:QUERY_READ, 
      variables: { // Provide any required variables here 
        modelName, 
      } 
    })
    .then( res => res.data.Read ) 
    .catch( err => err ) 
  }
  return { Model, Read } 
}
