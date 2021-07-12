import { IEntry, IField, IModel, IOption, IType } from '../../ifield.interface'; 
import { QUERY_FEEDBACK, QUERY_MODEL, QUERY_READ } from '../gql'; 
import { client } from '../../apolloclient'; 


export function useCached() { 
  // MODEL 
  function Model(modelName:string) { 
    const result = client.readQuery({ 
      query: QUERY_MODEL, 
      variables: { // Provide any required variables here
        modelName, 
      } 
    }); 
    if(!result || !('Model' in result)) 
      return {} as IModel; 
    return result.Model as IModel; 
  } 

  // READ 
  function Read(modelName:string) { 
    const result = client.readQuery({ 
      query: QUERY_READ, 
      variables: { // Provide any required variables here
        modelName, 
      } 
    }); 
    if(!result || !('Read' in result)) 
      return [] as IEntry[]; 
    return result.Read as IEntry[]; 
  } 

  // GET DEFAULT ENTRY 
  function GetDefaultEntry(modelName:string) { 
    const model = Model(modelName); 
    let entry = {} as IEntry; 
    model.fields?.forEach( f => { 
      entry[f.name] = GetDefaultValueFromIField(f); 
    }); 
    return entry; 
  }

  function GetIFields(modelName:string, fieldNames:string[]):IField[] { 
    const {fields} = Model(modelName); 
    return fieldNames.filter( name => fields.some(f => f.name === name) ) 
      .map( name => fields.find(f => f.name === name)) as IField[]; 
  }

  // GET ABBREV 
  function GetAbbrevField(modelName:string) { 
    // to complete 
    return {} as IField; 
  } 

  function GetIOptions(ifield:IField): IOption[] { 
    if(ifield.type.isEnum) 
      return (ifield.type?.enums ?? [] as string[]) 
        .map( e => { return {value:e, label:e}} ); 
    if(!ifield.ref) 
      return [] as IOption[]; 
    const entries = Read(ifield.ref); 
    const abbrevField = GetAbbrevField(ifield.ref); 
    return entries.map( entry => { 
      return {value:entry._id, label:entry[abbrevField.name]} 
    }) as IOption[]; 
  }
  
  return { Model, Read, GetIFields, GetDefaultEntry, GetIOptions } 
}

function GetDefaultValueFromIField(ifield:IField) { 
  if(ifield.type.isArray) 
    return []; 
  if(ifield.ref) 
    return ''; // return an null id value ?? 
  if(ifield.type.isObject) 
    return {}; 
  if(ifield.type.defaultValue) 
    return ifield.type.defaultValue; 
  return GetDefaultValueByType(ifield.type.name); 
}

function GetDefaultValueByType(type:string) { 
  if(type==='boolean') 
    return false; 
  if(type==='string') 
    return ''; 
  if(type==='number') 
    return 0; 
  if(type==='array') 
    return []; 
  if(type==='object') 
    return {}; 
  return null; 
} 