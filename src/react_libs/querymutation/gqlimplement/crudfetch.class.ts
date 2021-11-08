import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// --------------------------------------------------------
//import * as request from '../../../dao/gql'; 
import { GqlQueryMutation } from "./querymutation.class"; 
import { GqlIntrospection } from "./introspection.class"; 
import { GqlSubfields } from "./subfields.class";
import { GqlRequest } from "./request.class";



function ParseEntries(queryResult:any):IEntry[] { 
  const [parsed] = Object.values(queryResult); 
  return parsed as IEntry[]; 
} 



// ApolloGqlDao ---------------------------------------------- 
export class GqlCrudFetch { 
  private request: GqlRequest; 
  private querymutation: GqlQueryMutation; 
  // private subfielder: GqlSubfields; 
  // private introspection: GqlIntrospection; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.querymutation = new GqlQueryMutation(client); 
    this.request = new GqlRequest(client); 
    // this.introspection = new GqlIntrospection(client); 
    // this.subfielder = new GqlSubfields(client); 
  } 

  public async Create({modelName, inputs, subfields}:CreateArgs): Promise<IEntry[]> { 
    return await this.Mutation({action:'Create', modelName, variables:{inputs}, subfields}); 
  } 
  public async Read({modelName, ids, subfields}:ReadArgs): Promise<IEntry[]> { 
    //const _subfields = await this.subfielder.ReduceToSubfields({modelName, subfields}); 
    const query = this.request.Read(modelName, subfields); 
    const results = await this.querymutation.Query({query, variables:{ids}}); 
    return ParseEntries(results); 
  } 
  public async Update({modelName, inputs, subfields}:UpdateArgs): Promise<IEntry[]> { 
    return await this.Mutation({action:'Update', modelName, variables:{inputs}, subfields}); 
  } 
  public async Delete({modelName, ids, subfields}:DeleteArgs): Promise<IEntry[]> { 
    return await this.Mutation({action:'Delete', modelName, variables:{ids}, subfields}); 
  } 

  private async Mutation({action, modelName, variables, subfields}: 
    {action:string, modelName:string, subfields?:string[], variables:any}) 
    :Promise<IEntry[]> { 
      //const _subfields = await this.subfielder.ReduceToSubfields({modelName, subfields}); 
      const mutation = (this.request as any)[action](modelName, subfields); 
      const results = await this.querymutation.Mutation({mutation, variables}); 
      return ParseEntries(results); 
  }
}