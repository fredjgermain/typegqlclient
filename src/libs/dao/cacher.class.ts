import { 
  ApolloClient, 
  NormalizedCacheObject, 
} from "@apollo/client";

// --------------------------------------------------------
import { MODEL, READ } from './gql'; 


export class Cacher { 
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  }

  // Model 
  public Model(variables:{modelName:string}) { 
    const result = this.client.readQuery({ 
      query: MODEL, variables 
    }); 
    if(!result || !('Model' in result)) 
      return {} as IModel; 
    return result.model as IModel; 
  } 

  // Read 
  public Read(variables:{modelName:string, ids?:string[]}) { 
    const result = this.client.readQuery({ 
      query: READ, variables 
    }); 
    if(!result || !('Model' in result)) 
      return [] as IEntry[]; 
    return result.items as IEntry[]; 
  } 

  // Validate ?? 
} 
