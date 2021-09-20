import React, { useState } from 'react'; 

// --------------------------------------------------------
import { GetDefaultValue, GetTypeNameByValue, 
  GetValueFromInput, GetInputType, 
  TActionAttributes, ActionAttributes, EnterIsPressed } 
  from '../../utils'; 


export interface IInputScalar extends TActionAttributes { 
  value: any; 
  SetValue: (newValue:any) => void; 
  defaultValue?: any; 
  valueType?: string; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
} 



export function InitProps({inputAttribute = {}, ...props}:IInputScalar) { 
  console.log('init');
  // complete ttype definition 
  const valueType = props.valueType ?? GetTypeNameByValue(props.value); 
  const defaultValue = props.defaultValue ?? GetDefaultValue(valueType); 
  const value = props.value ?? defaultValue; 
  const SetValue = props.SetValue; 
  const type = inputAttribute.type ?? GetInputType(valueType); 
  const actionAttributes = DefaultActionAttributes({value, SetValue, inputAttribute}); 
  
  inputAttribute = { 
    value, type, 
    ...actionAttributes, 
    ...inputAttribute 
  } 

  return { value, SetValue, defaultValue, valueType, inputAttribute, ...actionAttributes } 
} 


function DefaultActionAttributes({value, SetValue}:IInputScalar):TActionAttributes { 
  const onChange = (event:any) => { 
    const newValue = GetValueFromInput(event); 
    SetValue(newValue); 
  } 

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => { 
    SetValue(value); 
  }

  // Enter Function called on KeyUp. 
  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => { 
    if(EnterIsPressed(event)) { 
      SetValue(value); 
    } 
  } 

  return ActionAttributes({onChange, onBlur, onEnter}); 
}

