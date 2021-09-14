// --------------------------------------------------------
import { GetDefaultValueByType, GetTypeByValue, 
  GetValueFromInput, GetInputType, 
  IsNull, DefaultWidth, IEvent } from '../../utils'; 
import React, { useState } from 'react'; 
import { IInput } from '../input.types'; 
import { GetTType, GetTTypeFromValue, IsInDomain } from '../../typeclass/type.class';




export function useInputScalar(props:IInput) { 
  // complete ttype definition 
  const ttype = props.ttype ? GetTType(props.ttype) : GetTTypeFromValue(props.value); 

  //console.log(ttype); 
  // complete placeholder definition. 
  const [value, setValue] = useState(props.value ?? ttype.defaultvalue); 

  // Input attributes .....................................
  // Calculate input width 
  // const width = props.sizeFunc ? 
  //   {width: `${props.sizeFunc(value)}ch`}: 
  //   {width: `${DefaultWidth(value, ttype.name ?? '')}ch`}; 

  //const style = {...props.inputAttribute?.style, ...width}; 
  const type = props.inputAttribute?.type ?? GetInputType(ttype.name ?? 'string'); 
  console.log(type); 

  const {onChange, onBlur, onKeyUp} = SetAction(type, value, setValue, props.sendValue); 
  const inputAttribute = {
    value, type, 
    onChange, onBlur, onKeyUp, 
    ...(props.inputAttribute ?? {} ) 
  } 

  return { value, setValue, ttype, inputAttribute } 
} 





/**
  type:text, number, password ... 
    onChange: setValue 
    onEnter: sendValue, 
    onBlur: sendValue 

  type:checkbox 
    onChange: setValue, sendValue, color 
    onEnter: sendValue, 
    onBlur: sendValue 
 */

function SetAction(inputType:string, value:any, setValue:(newValue:any)=>void, sendValue:(newValue:any)=>void) { 
  const onChange = (event:IEvent) => { 
    const newValue = GetValueFromInput(event); 
    setValue(newValue); 
    const typeSendValue = ['checkbox','color']; 
    if(typeSendValue.includes(inputType)) 
      sendValue(newValue); 
  } 

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => sendValue(value); 

  // Enter Function called on KeyUp. 
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => { 
    OnEnter(event) && sendValue(value); 
  } 

  return {onChange, onBlur, onKeyUp}; 
}

  // // on input changes 
  // const onChange = (event:IEvent) => { 
  //   const newValue = GetValueFromInput(event); 
  //   inputAttribute?.onChange && inputAttribute.onChange(newValue); 
  //   setValue(newValue); 
  // } 




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

