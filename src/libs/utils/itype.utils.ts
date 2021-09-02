import { GetDefaultValueByType } from './value_type.utils'; 

/** 
 * GetITypeFromString ?? name 
 * GetNestedITypeFromString [name] | {key:typeName ...} 
 */ 

type StringType = string | StringType[] | {[key:string]:StringType}; 

export function ITypeFromString(strType:StringType) { 
  const _is = {isScalar:false, isArray:false, isObject:false, isEnum:false} 
  if( typeof strType === 'string') 
    return { 
      name:strType, 
      defaultValue:GetDefaultValueByType(strType), 
      ..._is, isScalar: true, 
    } as IType; 

  if( Array.isArray(strType) ) 
    return { 
      name:'array', 
      defaultValue:[], 
      nestedType: strType.map( strtype => ITypeFromString(strType) ), 
      ..._is, isArray: true, 
    } as IType; 

  const nestedIType = Object.keys(strType).reduce( (acc, key) => { 
    acc[key] = ITypeFromString(strType[key]); 
    return acc; 
  }, {}) 

  return { 
    name:'object', 
    defaultValue:{}, 
    nestedType: nestedIType, 
    ..._is, isObject: true, 
  } as IType; 
}