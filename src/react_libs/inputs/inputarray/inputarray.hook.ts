import React, { useState } from 'react'; 

// --------------------------------------------------------
import { GetDefaultValue, IsEmpty } from '../../../utils/utils'; 
import { InputScalar } from '../../inputs'; 


type IInputScalar = React.ComponentProps<typeof InputScalar> 
export interface IInputArray extends Omit<IInputScalar, 'value' | 'SetValue'> { 
  values: any[]; 
  SetValues: (newValue:any[]) => void; 
} 



export function useInputArray({inputAttribute = {}, ...props}:IInputArray) { 
  // complete ttype definition 
  const valueType = props.valueType ?? 'string'; 
  const defaultValue = props.defaultValue ?? GetDefaultValue(valueType); 
  const values = IsEmpty(props.values) ? []: props.values; 
  const SetValues = props.SetValues; 

  function ElementArgs(at?:number):IInputScalar { 
    const _at = at ?? values.length // default last index to create at the end ... 
    const [value, SetValue] = useState(values[_at] ?? defaultValue); 
    return { 
      value, defaultValue, valueType, inputAttribute, 
      SetValue: (newValue:any) => SetValue(newValue), 
    }; 
  } 

  function Create(newValue:any) { 
    const copy = [...values, newValue]; 
    SetValues(copy); 
  } 

  function Update(at:number, newValue:any) { 
    const copy = [...values]; 
    copy[at] = newValue; 
    SetValues(copy); 
  } 

  function Delete(at:number) { 
    const copy = [...values]; 
    copy.splice(at,1); 
    SetValues(copy); 
  } 

  return { values, SetValues, defaultValue, valueType, inputAttribute, ElementArgs, Create, Update, Delete } 
} 
