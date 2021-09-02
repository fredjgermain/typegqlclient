import { 
  ApolloClient, 
  NormalizedCacheObject, 
} from "@apollo/client";


// --------------------------------------------------------
import * as request from './gql'; 
import { ReduceSubfields } from './fetcher.class'; 


type Item = IModel & {_id:string}; 

export class Cacher { 
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  }

  

  // MODEL ................................................
  public ModelDescriptors({subfields, modelsName}:{subfields?:string[], modelsName?:string[]}) { 
    const defaultSubfields = ["_id accessor label description ifields"]; 
    const query = request.MODELDESCRIPTORS( ReduceSubfields(subfields, defaultSubfields) ); 
    const variables = {modelsName}; 
    
    //console.log('not defined', this.client.cache); 
    
    const results = this.client.readQuery({query, variables})?.ModelDescriptors as Item[]; 
    return results.map( item => {
      const {_id, accessor, label, description, ifields} = item; 
      return {_id, accessor, label, description, ifields}; 
    }); 
  } 

  // READ ................................................
  public Read(modelName:string, subfields:string, ids?:string[]) { 
    const query = request.READ(modelName, subfields); 
    const variables = {ids}; 
    const result = this.client.readQuery({query, variables}) 
    console.log('cacher', result); 
    return result; 
  } 

  /*public Model(variables:{modelName:string}) { 
    const result = this.client.readQuery({ 
      query: MODEL, variables 
    }); 
    if(!result || !('Model' in result)) 
      return {} as IModel; 
    return result.model as IModel; 
  } */

  // READ .................................................
  /*public Read(variables:{modelName:string, ids?:string[]}) { 
    const result = this.client.readQuery({ 
      query: READ, variables 
    }); 
    console.log("cache", result); 

    if(!result || !('items' in result)) 
      return [] as IEntry[]; 
    return result.items as IEntry[]; 
  } */

  // Validate ?? 
} 
