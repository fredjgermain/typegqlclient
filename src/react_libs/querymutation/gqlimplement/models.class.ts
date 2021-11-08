import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// --------------------------------------------------------
import { GetDefaultValue } from "../../../utils/type.utils"; 
import * as request from '../../../dao/gql'; 
import { GqlQueryMutation } from "./querymutation.class";



export class GqlModel { 
  private querymutation: GqlQueryMutation; 
  private defaultModelSubfields = "{_id accessor label description ifields}"; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.querymutation = new GqlQueryMutation(client); 
  } 

  /** Models ----------------------------------------------- 
   * Fetch models 
   * 
   * @param param0 
   * @returns 
   */
   public async Models({modelNames}:{modelNames:string[]}):Promise<IModel[]> { 
    try { 
      const query = request.ModelDescriptors(this.defaultModelSubfields); 
      const variables = {modelNames}; 
      const res = await this.querymutation.Query({query, variables}); 

      // fetch TypeIntrospection ... 

      return this.ParseModels(res); 
    } catch(err) { 
      throw err; 
    } 
  } 

  /** CacheModels ---------------------------------------- 
   * Return Models from Cache. 
   * 
   * @param param0 
   * @returns 
   */
   public CacheModels({modelNames}:{modelNames:string[]}):IModel[] { 
    try { 
      const query = request.ModelDescriptors(this.defaultModelSubfields); 
      const variables = {modelNames}; 
      const res = this.querymutation.CacheQuery({query, variables}); 
      return this.ParseModels(res); 
    } catch(error) { 
      throw error; 
    } 
  } 

  // Get -------------------------------------------------- 
  public GetDefaultEntry(modelName:string): IEntry { 
    let defaultEntry = {_id:''} as IEntry; 
    const [model] = this.CacheModels({modelNames:[modelName]}); 
    if(!model) 
      return defaultEntry; 
    const ifields = model.ifields.filter( f => f.options?.readable || f.options?.editable ); 
    ifields.forEach( f => defaultEntry[f.accessor] = f.type.defaultValue ?? GetDefaultValue(f.type.name) ) 
    return defaultEntry; 
  } 

  /** ParseModels ----------------------------------------- 
   * 
   * @param queryResult 
   * @returns 
   */
   private ParseModels(queryResult:any):IModel[] { 
    const results = Object.values(queryResult).flat() as IModel[]; 
    return results; 
  } 

} 