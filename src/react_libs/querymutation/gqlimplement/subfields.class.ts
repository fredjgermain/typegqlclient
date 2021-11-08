import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// --------------------------------------------------------
import { GqlIntrospection } from "./introspection.class"; 
import { IsEmpty, ReduceToString } from "../../../utils/utils"; 


// console.log( ReduceSubfields() ); 

// console.log( ReduceSubfields(["_id single"]) ); 

// console.log( ReduceSubfields(["_id nested { _id }"]) ); 

// console.log( ReduceSubfields(["_id", 'nested', ["_id"] ] ) ); 

// console.log( ReduceSubfields(["_id", 'nested0', ['_id', 'nested1', ['_id'] ] ]) ); 




export class GqlSubfields { 
  private introspection: GqlIntrospection; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.introspection = new GqlIntrospection(client); 
  }

  
  public async DefaultSubfields({modelName}:{modelName:string}):Promise<string[]> { 
    try{ 
      const {fields} = await this.introspection.TypeIntrospection({modelName}); 
      return fields.map( ({name, type}) => { 
        return this.introspection.FieldIsObject(type) ? `${name}{_id}` : `${name}`; 
      }) 
    } catch(error) { 
      return ["_id"]; 
    } 
  }

  /** DefaultSubfields ------------------------------------ 
   * Use Type introspection from cache data to find DefaultSubfields for a given model. 
   * 
   * @param modelName 
   * @returns 
   */
  public CacheDefaultSubfields({modelName}:{modelName:string}):string[] { 
    try{ 
      const {fields} = this.introspection.CacheTypeIntrospection({modelName}); 
      return fields.map( ({name, type}) => { 
        return this.introspection.FieldIsObject(type) ? `${name}{_id}` : `${name}`; 
      }) 
    } catch(error) { 
      return ["_id"]; 
    } 
  } 

  private ReduceSubfields(subfields?:TSubfield):string { 
    if( !subfields || IsEmpty(subfields) ) return ""; 
    if( typeof subfields === 'string' ) 
      return subfields; 
    return `{ ${ReduceToString( subfields.map( sub => this.ReduceSubfields(sub) ) ) } }`; 
  } 

  public async ReduceToSubfields({modelName, subfields}:{modelName?:string, subfields?:TSubfield}):Promise<string> { 
    if(!modelName) 
      return this.ReduceSubfields( subfields ?? ""); 
    const defaultSubfields = await this.DefaultSubfields({modelName}); 
    return `{${subfields ?? ReduceToString( defaultSubfields )}}`; 
  } 

  public CacheReduceToSubfields({modelName, subfields}:{modelName?:string, subfields?:TSubfield}):string { 
    if(!modelName) 
      return this.ReduceSubfields( subfields ?? ""); 
    const defaultSubfields = this.CacheDefaultSubfields({modelName}); 
    return `{${subfields ?? ReduceToString( defaultSubfields )}}`; 
  } 

} 
