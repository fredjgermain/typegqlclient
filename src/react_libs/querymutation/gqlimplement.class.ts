import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// -------------------------------------------------------- 
import { GqlQueryMutation } from "./gqlimplement/querymutation.class"; 
import { GqlIntrospection } from "./gqlimplement/introspection.class"; 
import { GqlCrudFetch } from "./gqlimplement/crudfetch.class"; 
import { GqlCrudCache } from "./gqlimplement/crudcache.class"; 
import { GqlModel } from "./gqlimplement/models.class"; 
import { GqlAbbrevOptions } from './gqlimplement/abbrevoptions.class'; 


export type CreateArgs = {modelName:string, inputs:Partial<IEntry>[], subfields?:string[]} 
export type ReadArgs = {modelName:string, ids?:string[], subfields?:string[]} 
export type UpdateArgs = {modelName:string, inputs:IEntry[], subfields?:string[]} 
export type DeleteArgs = {modelName:string, ids?:string[], subfields?:string[]} 



export class GqlCrudImplement { 
  private querymutation: GqlQueryMutation; 
  private introspection: GqlIntrospection; 
  private abbrevoptions: GqlAbbrevOptions; 

  private models: GqlModel; 
  private fetcher: GqlCrudFetch; 
  private cacher: GqlCrudCache; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.querymutation = new GqlQueryMutation(client); 
    this.introspection = new GqlIntrospection(client); 
    this.abbrevoptions = new GqlAbbrevOptions(client); 

    this.models = new GqlModel(client); 
    this.fetcher = new GqlCrudFetch(client); 
    this.cacher = new GqlCrudCache(client); 
  } 


  // Fetch ------------------------------------------------ 
  public async Models({modelNames}:{modelNames:string[]}) { 
    return await this.models.Models({modelNames}); 
  }

  public async Create(args:CreateArgs):Promise<IEntry[]> { 
    try{ 
      const inputs = await this.fetcher.Create(args); 
      return this.cacher.Create({...args, inputs}); 
    } catch(error) { 
      throw error; 
    } 
  } 

  public async Read(args:ReadArgs):Promise<IEntry[]> { 
    return await this.fetcher.Read(args); 
  }

  public async Update(args:UpdateArgs):Promise<IEntry[]> { 
    try{ 
      const inputs = await this.fetcher.Update(args); 
      return this.cacher.Update({...args, inputs}); 
    } catch(error) { 
      throw error; 
    } 
  } 

  public async Delete(args:DeleteArgs):Promise<IEntry[]> { 
    try{ 
      const inputs = await this.fetcher.Delete(args); 
      const ids = inputs.map(i => i._id); 
      return this.cacher.Delete({...args, ids}); 
    } catch(error) { 
      throw error; 
    } 
  } 

  // Validation ------------------------------------------- 
  public FrontValidation({modelName, inputs, subfields}:CreateArgs):boolean[] { 
    return []; 
  } 

  public async BackValidation({modelName, inputs, subfields}:CreateArgs):Promise<boolean[]> { 
    return []; 
  } 

} 






