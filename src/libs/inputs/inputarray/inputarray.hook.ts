import React, { useState } from 'react'; 

// --------------------------------------------------------
import { GetDefaultValueByType } from '../../utils'; 
import { IInput } from '../input.types'; 



export interface IUseInputArray extends Omit<IInput, 'value' | 'SetValue'> {
  values:any[]; 
  SetValues:(newValue:any[]) => void; 

  ElementArgs: (at?: number | undefined) => IInput; 
  Create: (newValue:any) => void; 
  Update: (at: number, newValue:any) => void; 
  Delete: (at: number) => void; 
}

export function useInputArray({inputAttribute = {}, ...props}:IInput): IUseInputArray { 
  // complete ttype definition 
  const valueType = props.valueType ?? 'string'; 
  const defaultValue = props.defaultValue ?? GetDefaultValueByType(valueType); 
  const values = props.value ?? []; 
  const SetValues = props.SetValue; 

  function ElementArgs(at?:number):IInput { 
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
