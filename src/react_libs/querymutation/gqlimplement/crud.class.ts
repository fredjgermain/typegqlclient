import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// -------------------------------------------------------- 
import { GqlCrudFetch } from "./crudfetch.class"; 
import { GqlCrudCache } from "./crudcache.class"; 


export class GqlCrud { 
  private fetcher: GqlCrudFetch; 
  private cacher: GqlCrudCache; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.fetcher = new GqlCrudFetch(client); 
    this.cacher = new GqlCrudCache(client); 
  } 


  // Fetch ------------------------------------------------ 
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
} 






