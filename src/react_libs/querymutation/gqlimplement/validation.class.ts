import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// -------------------------------------------------------- 
import { GqlQueryMutation } from "./querymutation.class"; 
import { GqlIntrospection } from "./introspection.class"; 
import { GqlCrudFetch } from "./crudfetch.class"; 
import { GqlCrudCache } from "./crudcache.class"; 
import { GqlAbbrevOptions } from './abbrevoptions.class'; 



export class GqlValidation { 
  private querymutation: GqlQueryMutation; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.querymutation = new GqlQueryMutation(client); 
  } 



  // Validation ------------------------------------------- 
  public FrontValidation({modelName, inputs, subfields}:CreateArgs):boolean[] { 
    return []; 
  } 

  public async BackValidation({modelName, inputs, subfields}:CreateArgs):Promise<boolean[]> { 
    return []; 
  } 

} 






