// --------------------------------------------------------
import { GetDefaultValueByType, GetTypeByValue, 
  GetValueFromInput, GetInputType, 
  IsNull, DefaultWidth, IEvent } from '../../../utils'; 
import { useState } from 'react';
//import { IInputScalar, PrepArgs } from './inputscalar.utils'; 

/** Input 
 * Accepts most input types 
 * @param param0 
 * @returns 
 */
export function InputScalar({...props}:IInputScalar) { 
  const {width, ...args} = useInputScalar(props); 
  const style = {...props.inputAttribute?.style, ...width}; 
  const inputArgs = {...props.inputAttribute, ...args, style}; 
  
  if(args.type ==='checkbox') 
    return <input {...inputArgs} {...{checked:args.value} }  /> 
  return <input {...inputArgs} /> 
}



export interface IInputScalar { 
  type?: string; 
  value?: any; 
  defaultValue?: any; 
  inputType?: string; 

  placeholder?: string; 

  onChange: (newValue:any) => void; 
  onPressEnter?: (newValue:any) => void; 
  onPressTab?: (newValue:any) => void; 

  sizeFunc?: (value:any) => number; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
} 



export function useInputScalar({...props}:IInputScalar) { 
  const type = props.type ?? GetTypeByValue(props.value ?? props.defaultValue) ?? 'string'; 
  const inputType = props.inputType ?? GetInputType(type); 
  const placeholder = props.placeholder ?? ''; 
  const _value = props.value ?? props.defaultValue ?? GetDefaultValueByType(type); 
  const defaultValue = props.defaultValue ?? GetDefaultValueByType(type); 

  const [value, setValue] = useState(_value); 

  // on input changes 
  const onChange = (event:IEvent) => { 
    const valueFromInput = GetValueFromInput(event); 
    const newValue = IsNull(valueFromInput) ? defaultValue : valueFromInput; 
    if(JSON.stringify(newValue) !== JSON.stringify(value) ) { 
      setValue(newValue); 
      props.onChange(newValue); 
    } 
  } 

  // Tab Function called on KeyDown. 
  const onBlur = () => { 
    if(props.onPressTab) props.onPressTab(value) 
  }; 
  // Enter Function called on KeyUp. 
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => { 
    if(OnEnter(event) && props.onPressEnter) props.onPressEnter(value) 
  } 

  // Calculate input width 
  const width = props.sizeFunc ? 
    {width: `${props.sizeFunc(value)}ch`}: 
    {width: `${DefaultWidth(value, type)}ch`}; 

  // Regroups to arguments to pass to input tag
  return {type:inputType, value, placeholder, onChange, onKeyUp, width, onBlur} 
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


/*export function OnTab(event:any, Func:()=>void = ()=>{}) { 
  OnPress(event, ['Tab'], Func); 
} */
