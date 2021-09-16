import React, { useState } from 'react'; 

// --------------------------------------------------------
import { GetDefaultValue, GetTypeNameByValue, 
  GetValueFromInput, GetInputType, IEvent } 
  from '../../utils'; 
import { IInput } from '../input.types'; 



export function InitProps({inputAttribute = {}, ...props}:IInput):IInput { 
  console.log('init');
  // complete ttype definition 
  const valueType = props.valueType ?? GetTypeNameByValue(props.value); 
  const defaultValue = props.defaultValue ?? GetDefaultValue(valueType); 
  const value = props.value ?? defaultValue; 
  const SetValue = props.SetValue; 
  const type = inputAttribute.type ?? GetInputType(valueType); 
  
  let {onChange, onBlur, onEnter} = DefaultSetAction({value, SetValue, defaultValue, valueType, inputAttribute}); 
  // let  = { 
  //   onChange: props.onChange ?? defaultSetAction.onChange, 
  //   onBlur: props.onBlur ?? defaultSetAction.onBlur, 
  //   onEnter: props.onEnter ?? defaultSetAction.onEnter 
  // } 
  
  inputAttribute = { value, type, 
    onChange, onBlur, onKeyUp:onEnter, 
    ...inputAttribute 
  } 

  return { value, SetValue, defaultValue, valueType, inputAttribute } 
} 



type InputActions = { 
  onChange?: (event:IEvent) => void; 
  onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void; 
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; 
} 
function DefaultSetAction({value, SetValue}:IInput): InputActions { 
  const onChange = (event:IEvent) => { 
    const newValue = GetValueFromInput(event); 
    console.log('onChange'); 
    SetValue(newValue); 
  } 

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => { 
    console.log('onBlur', value); 
    SetValue(value); 
  }

  // Enter Function called on KeyUp. 
  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => { 
    console.log('onEnter', value); 
    if(OnEnter(event)) { 
      
      SetValue(value); 
    }
  } 

  return {onChange, onBlur, onEnter}; 
}



/** ONPRESS
 * test if a any of the given 'keys' have been pressed. If so then execute 'Func'
 * @param event event object to get key event from. 
 * @param keys keys to test. 
 * @param Func Func to execute when given keys are pressed. 
 */
 export function OnPress(event:any, keys:string[])  { 
  const {code} = (event as IEvent); 
  return keys.includes(code) 
} 

export const OnEnter = (event:any) => OnPress(event, ['Enter', 'NumpadEnter']); 
export const OnTab = (event:any) => OnPress(event, ['Tab']); 

