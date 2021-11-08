import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// --------------------------------------------------------
//import * as request from '../../../dao/gql'; 
// import { GqlIntrospection } from "./introspection.class"; 
// import { GqlSubfields } from "./subfields.class";
import { GqlQueryMutation } from "./querymutation.class"; 
import { Filter, Update } from "../../../utils/utils"; 
import { GqlRequest } from "./request.class";



function ParseEntries(queryResult:any):IEntry[] { 
  const [parsed] = Object.values(queryResult); 
  return parsed as IEntry[]; 
} 


export class GqlCrudCache { 
  private request: GqlRequest; 
  private querymutation: GqlQueryMutation; 
  // private introspection: GqlIntrospection; 
  // private subfielder: GqlSubfields; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.request = new GqlRequest(client); 
    this.querymutation = new GqlQueryMutation(client); 
    // this.introspection = new GqlIntrospection(client); 
    // this.subfielder = new GqlSubfields(client); 
  } 

  private Mutation({modelName, modEntries, subfields}:{modelName:string, modEntries:IEntry[], subfields?:string[]}) { 
    //const _subfields = this.subfielder.CacheReduceToSubfields({modelName}); 
    const query = this.request.Read(modelName, subfields); 
    const queryName = `Read${modelName}`; 
    this.querymutation.CacheWrite({queryName, query, modEntries}); 
  } 

  public Create({modelName, inputs, subfields}:UpdateArgs): IEntry[] { 
    const ids = inputs.map(i=>i._id); 
    const existingEntries = this.Read({modelName}) 
    const modEntries = [...existingEntries, ...inputs]; 
    this.Mutation({modelName, modEntries}); 
    return inputs; 
  } 
  public Read({modelName, ids, subfields}:ReadArgs): IEntry[] { 
    //const _subfields = this.subfielder.CacheReduceToSubfields({modelName}); 
    const query = this.request.Read(modelName, subfields); 
    const results = this.querymutation.CacheQuery({query, variables:{ids}}) as IEntry[]; 
    return ParseEntries(results); 
  } 
  public Update({modelName, inputs, subfields}:UpdateArgs): IEntry[] { 
    const existingEntries = this.Read({modelName}) 
    const modEntries = Update(existingEntries, inputs, (t, i) => t._id === i._id ); 
    this.Mutation({modelName, modEntries}); 
    return inputs; 
  } 
  public Delete({modelName, ids = [], subfields}:DeleteArgs): IEntry[] { 
    const existingEntries = this.Read({modelName}) 
    const [modEntries, deleted] = Filter(existingEntries, ({t}) => !ids.includes(t._id) ); 
    this.Mutation({modelName, modEntries}); 
    return deleted; 
  } 
} 


