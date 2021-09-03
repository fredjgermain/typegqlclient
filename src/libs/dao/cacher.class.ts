import { 
  ApolloClient, 
  NormalizedCacheObject, 
} from "@apollo/client";


// --------------------------------------------------------
import * as request from './gql'; 
import { 
  ReduceSubfields, ParseModelDescriptors, ParseCrudResult, 
  ModelDescriptor, ArgsIds, ArgsModelName, ArgsModelDescriptors, CrudResult
} from './dao.utils'; 
import { IsEmpty } from "../utils/value_type.utils"; 
import { CrudError } from "./fetcher.class";



export class Cacher { 
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  }

  

  // MODEL ................................................
  public ModelDescriptors({modelsName, subfields}:ArgsModelDescriptors) { 
    const defaultSubfields = ["_id accessor label description ifields"]; 
    const query = request.MODELDESCRIPTORS( ReduceSubfields(subfields, defaultSubfields) ); 
    const variables = {modelsName}; 
    
    try{
      const results = this.client.readQuery({query, variables})?.ModelDescriptors as ModelDescriptor[]; 
      return ParseModelDescriptors(results); 
    }catch(err) { 
      return null; 
    } 
  } 

  // READ ................................................
  public Read({modelName, subfields, ids}:ArgsIds) { 
    const reducedSubfields = this.GetReducedSubfields({modelName, subfields}); 
    const query = request.READ(modelName, reducedSubfields); 
    const variables = {ids}; 

    let results = {} as CrudResult; 
    try{ 
      results = ParseCrudResult( this.client.readQuery({query, variables}) ) 
    } catch(err) { 
      results.errors = [err as any]; 
    }
    
    if(!IsEmpty(results.errors)) 
      throw new CrudError(results.errors); 
    return results.items; 
  } 

  // GetSubfields -----------------------------------------
  private GetReducedSubfields({modelName, subfields}:ArgsModelName) { 
    const defaultSubfields = this.GetDefaultSubfields(modelName); 
    return ReduceSubfields(subfields, defaultSubfields); 
  }

  private GetDefaultSubfields(modelName:string) { 
    const [model] = this.ModelDescriptors({modelsName:[modelName]}) ?? []; 
    const subfields = (model as ModelDescriptor)?.ifields.filter( f => f.accessor != '__v'); 
    return subfields?.map( f => f.accessor) ?? ["_id"]; 
  }
} 
