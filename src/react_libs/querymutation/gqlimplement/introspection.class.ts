import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// --------------------------------------------------------
import * as request from '../../../dao/gql'; 
import { GqlQueryMutation } from "./querymutation.class";



// Introspection ------------------------------------------ 
type TIntrospectField = {
  name: string, 
  kind: string, 
  ofType?: TIntrospectField, 
} 
type TIntrospect = { 
  name: string, 
  fields: { 
    name:string, 
    type:TIntrospectField, 
  }[] 
} 

export class GqlIntrospection { 
  private querymutation: GqlQueryMutation; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.querymutation = new GqlQueryMutation(client); 
  } 

  /** TypeIntrospection and parsing ----------------------- 
   * Fetch Type Introspection 
   * @param param0 
   * @returns 
   */
  public async TypeIntrospection({modelName}:{modelName:string}):Promise<TIntrospect> { 
    try{ 
      const query = request.Type(); 
      const variables = {name:modelName}; 
      const res = await this.querymutation.Query({query, variables}) 
      return this.ParseTypeIntrospection(res); 
    }catch(err) { 
      throw err; 
    } 
  } 

  /** Cache Type Introspection ----------------------------- 
   * Return TypeIntrospection from cache. 
   * 
   * @param param0 
   * @returns 
   */
  public CacheTypeIntrospection({modelName}:{modelName:string}):TIntrospect { 
    try{ 
      const query = request.Type(); 
      const variables = {name:modelName}; 
      const res = this.querymutation.CacheQuery({query, variables}) 
      return this.ParseTypeIntrospection(res); 
    }catch(err) { 
      throw err; 
    } 
  } 

  public IsInCache({modelName}:{modelName:string}):boolean { 
    const query = request.Type(); 
    const variables = {name:modelName}; 
    return this.querymutation.IsInCache({query, variables}) 
  } 

  // Introspection helper -------------------------------- 
  // Introspection Field methods 
  public FieldIsList(field:TIntrospectField):boolean { 
    const predicate = (f:TIntrospectField) => f.kind === 'LIST'; 
    return this.FieldHas(field, predicate); 
  } 

  public FieldIsObject(field:TIntrospectField):boolean { 
    const predicate = (f:TIntrospectField) => f.kind === 'OBJECT'; 
    return this.FieldHas(field, predicate); 
  } 

  public FieldHas(field:TIntrospectField, predicate:(field:TIntrospectField) => boolean):boolean { 
    if(predicate(field)) 
      return true; 
    if(field.ofType) 
      return this.FieldHas(field.ofType, predicate); 
    return false; 
  } 

  public FieldNestedType(field:TIntrospectField):{kind:string, name:string} { 
    if(field.ofType) 
      return this.FieldNestedType(field.ofType); 
    return {kind:field.kind, name:field.name}; 
  } 

  /** ParseTypeIntrospection ------------------------------ 
   * 
   * @param queryResult 
   * @returns 
   */
  private ParseTypeIntrospection(queryResult:any):TIntrospect { 
    const [result] = Object.values(queryResult).flat() as any[]; 
    return result; 
  } 
} 

