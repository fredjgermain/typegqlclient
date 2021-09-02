// --------------------------------------------------------
import { GetDefaultValueByType, GetTypeByValue, GetValueFromInput, GetInputType, 
  OnEnter, IsNull, DefaultWidth, IEvent } from '../../../utils'; 



export interface IInput { 
  type?: string; 
  value?: any; 
  defaultValue?: any; 
  inputType?: string; 

  placeholder?: string; 

  onSetValue: (newValue:any) => void; 
  onPressEnter?: () => void; 
  onPressTab?: () => void; 

  sizeFunc?: (value:any) => number; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
}
  


/** PrepArgs
 * Assures that all necessary properties are defined or set to their a default value. 
 * @param param0 
 * @returns 
 */
export function PrepArgs({...props}:IInput) { 
  const type = props.type ?? GetTypeByValue(props.value ?? props.defaultValue) ?? 'string'; 
  const value = props.value ?? props.defaultValue ?? GetDefaultValueByType(type); 
  const defaultValue = props.defaultValue ?? GetDefaultValueByType(type); 
  const inputType = props.inputType ?? GetInputType(type); 
  const placeholder = props.placeholder ?? ''; 

  // Called on input Change
  const onChange = (event:IEvent) => { 
    const valueFromInput = GetValueFromInput(event); 
    const newValue = IsNull(valueFromInput) ? defaultValue : valueFromInput; 
    if(JSON.stringify(newValue) !== JSON.stringify(value) ) 
      props.onSetValue(newValue); 
  } 

  // Tab Function called on KeyDown. 
  //const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => OnTab(event, props.onPressEnter); 
  const onBlur = () => props.onPressTab && props.onPressTab(); 
  // Enter Function called on KeyUp. 
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => OnEnter(event, props.onPressEnter); 

  // Calculate input width 
  const width = props.sizeFunc ? 
    {width: `${props.sizeFunc(value)}ch`}: 
    {width: `${DefaultWidth(value, type)}ch`}; 
  
  // Regroups to arguments to pass to input tag
  return {type:inputType, value, placeholder, onChange, onKeyUp, width, onBlur} 
} 
