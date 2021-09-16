import { GetDefaultValueByType } from "../utils";


export type TType = { 
  name?: string, 
  key?: string, 
  domain?: ((x:any) => boolean | any[]), 
  defaultvalue?: any, 
  nested?: TType[] 
} 

// "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array"
export const TypesOf = { 
  boolean:'boolean', 
  number:'number', 
  bigint:'bigint', 
  string:'string', 
  object:'object', 
  array:'array', 
  function:'function', 
  symbol:'symbol', 
  undefined:'undefined', 
} 

export const DefaultValues = { 
  boolean: false, 
  number: 0, 
  bigint: 0, 
  string: '', 
  object: {}, 
  array: [], 
  function: () => {}, 
} as any; 


/** GetTTypeValue ============================================ 
 * 
 * @param value 
 * @returns 
 */ 
 export function GetTTypeFromValue(value:any):TType { 
  const name = GetTypeNameByValue(value); 
  const defaultvalue = GetDefaultValueByType(name); 

  const nested = 
    name === 'object' ? Object.keys(value).map( key => { 
      return { key, ...GetTTypeFromValue(value[key])} as TType 
    }): 
    Array.isArray(value) ? [GetTTypeFromValue(value[0])] : 
    undefined; 

  const domain = (x:any) => true; 
  
  return {name, defaultvalue, nested, domain}; 
}



/** GetTType ==============================================
 * 
 * @param ttype 
 * @returns 
 */
export function GetTType(ttype:TType):TType { 
  
  const name = ttype.name ? ttype.name :
    ttype.nested && ttype.nested.every( type => !!type.key ) ? 'object' : 
    ttype.nested && ttype.nested.every( type => !type.key ) ? 'array' : 
    GetTypeNameByValue(ttype.defaultvalue); 

  const defaultvalue = ttype.defaultvalue ?? GetDefaultValueByType(name); 
  
  const nested = ttype.nested ? ttype.nested : 
    name === 'object' ? [] : 
    name === 'array' ? [] : 
    undefined; 

  const domain = ttype.domain ?? (x => true); 

  return {...ttype, ...{name, domain, defaultvalue, nested}} 
}


/** GetDefaultValue ========================================
 * 
 * @param ttype 
 * @returns 
 */
export function GetDefaultValue(ttype:TType) { 
  return ttype.defaultvalue ?? DefaultValues[ttype.name ?? ''] ?? undefined; 
} 



/** IsInDomain ==============================================
 * 
 * @param x 
 * @param type 
 * @returns 
 */
export function IsInDomain(x:any, type:TType) { 
  if( Array.isArray(type.domain) ) 
    return type.domain.includes(x); 
  if( typeof type.domain === 'function' ) 
  return type.domain(x); 
} 

export const NUMERIC_DOMAIN = { 
  IsNatural: (x:any) => !Number.isNaN(x) && x >= 0, 
  IsInteger: (x:any) => Number.isInteger(x), 
  IsEven: (x:any) => !Number.isNaN(x) && x % 2 === 0, 
  IsOdd: (x:any) => !Number.isNaN(x) && x % 2 != 0, 
}


/** GetTypeNameByValue ======================================== 
 * 
 * @param value 
 * @returns 
 */ 
export function GetTypeNameByValue(value:any) { 
  return Array.isArray(value) ? 'array': typeof value; 
} 