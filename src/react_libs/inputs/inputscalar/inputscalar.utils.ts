import React, {  } from 'react'; 
import { GetDefaultValue, GetTypeNameByValue, DateToString } 
  from '../../../utils/utils'; 
import { GetInputType, GetValueFromInput, TActionAttributes, ActionAttributes, EnterIsPressed } 
  from '../../react.utils'; 


// --------------------------------------------------------
export interface IInputScalar extends TActionAttributes { 
  value: any; 
  SetValue: (newValue:any) => void; 
  defaultValue?: any; 
  valueType?: string; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
}


export function InitProps({inputAttribute = {}, ...props}:IInputScalar) { 
  // complete ttype definition 
  const valueType = props.valueType ?? GetTypeNameByValue(props.value); 
  const defaultValue = props.defaultValue ?? GetDefaultValue(valueType) ?? ''; 
  let value = props.value ?? defaultValue; 
  if(valueType === 'date') 
    value = DateToString(value); 

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

