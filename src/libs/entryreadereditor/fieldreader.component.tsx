import { DisplayArray, DisplayScalar } from '../inputs'; 


export function FieldReader({entry, ifield, options}:{
    entry:IEntry, 
    ifield:IField, 
    options:IOption[], 
  }) { 
  const value = entry[ifield.accessor] ?? ifield.type.defaultValue; 

  const DisplayComponent = 
    ifield.type.isArray ? <DisplayArray {...{values:value, options}} /> : 
      <DisplayScalar {...{value, options}} /> 

  return <span>{DisplayComponent}</span>
} 
