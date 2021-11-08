import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 



// --------------------------------------------------------
export class GqlQueryMutation { 
  private client:ApolloClient<NormalizedCacheObject>; 
  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  } 


  // Query ................................................ 
  public async Query({query, variables}:{query:any, variables:any}) { 
    const {data} = await this.client.query({query, variables}) 
    return data; 
  } 

  // Mutation ............................................ 
  public async Mutation({mutation, variables}:{mutation:any, variables:any}) { 
    const {data} = await this.client.mutate({mutation, variables}) 
    return data; 
  } 

  // CacheQuery ........................................... 
  public CacheQuery({query, variables}:{query:any, variables?:any}) { 
    const results = this.client.cache.readQuery({query, variables}); 
    return results; 
  } 

  public IsInCache({query, variables}:{query:any, variables?:any}) { 
    try{ 
      const results = this.client.cache.readQuery({query, variables}); 
      return !!results; 
    } catch(error) { 
      return false; 
    } 
  } 

  // CacheWrite ........................................... 
  public CacheWrite({queryName, query, modEntries}:{queryName:string, query:any, modEntries:IEntry[]}) { 
    const data = {[queryName]:modEntries}; 
    this.client.cache.writeQuery({query, data}); 
  } 
} 
