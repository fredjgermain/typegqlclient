import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// --------------------------------------------------------
import * as request from './gqlrequest'; 
import { GqlIntrospection } from "./introspection.class"; 
import { GqlSubfields } from "./subfields.class"; 



export class GqlRequest { 
  private introspection: GqlIntrospection; 
  private subfielder: GqlSubfields; 
  private defaultModelSubfields = "{_id accessor label description ifields}"; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.introspection = new GqlIntrospection(client); 
    this.subfielder = new GqlSubfields(client); 
  } 

  public Type() { return request.Type(); } 

  public Models(subfields?:TSubfield) { 
    const _subfields = this.subfielder.CacheReduceToSubfields({subfields}); 
    return request.ModelDescriptors(_subfields); 
  } 

  public Create(modelName:string, subfields?:TSubfield) { 
    const _subfields = this.subfielder.CacheReduceToSubfields({modelName, subfields}); 
    return request.Create(modelName, _subfields); 
  } 

  public Read(modelName:string, subfields?:TSubfield) { 
    const _subfields = this.subfielder.CacheReduceToSubfields({modelName, subfields}); 
    return request.Read(modelName, _subfields); 
  } 

  public Update(modelName:string, subfields?:TSubfield) { 
    const _subfields = this.subfielder.CacheReduceToSubfields({modelName, subfields}); 
    return request.Update(modelName, _subfields); 
  } 

  public Delete(modelName:string, subfields?:TSubfield) { 
    const _subfields = this.subfielder.CacheReduceToSubfields({modelName, subfields}); 
    return request.Delete(modelName, _subfields); 
  } 


  // public GetRequest<T>({requestName, modelName, subfields}: 
  //   {requestName:string, modelName:string, subfields?:TSubfield[]}) { 
  //     const defaultSubfields = this.subfielder.CacheDefaultSubfields({modelName}); 
  //     const _subfields = this.subfielder.CacheReduceToSubfields({modelName, subfields}); 
  //     return (request as any)[requestName](modelName, _subfields); 
  // }   

  // public GetRequest({action, modelName, subfields}: 
  //   {action:string, modelName?:string, subfields?:string[]}) { 
  // }

} 

