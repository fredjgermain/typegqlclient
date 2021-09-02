// --------------------------------------------------------
import { IInput } from '../input/_input'; 
import { GetDefaultValueByType, GetTypeByValue, GetInputType } from '../../../utils'; 


export interface IUseInputArray extends IInput { 
  ElementArgs:(at?:number) => IInput; 
  Create:(newValue:any) => void; 
  Update:(at:number, newValue:any) => void; 
  Delete:(at:number) => void; 
} 

export function PrepArgs({...props}:IInput) { 
  const type = props.type ?? GetTypeByValue(props.value ?? props.defaultValue) ?? 'string'; 
  const value = Array.isArray(props.value) ? props.value: []; 
  const defaultValue = props.defaultValue ?? GetDefaultValueByType(type); 
  //const placeholder = props.placeholder ?? ''; 

  // ElementArgs 
  function ElementArgs(at?:number):IInput { 
    const valueAt = value[at??-1] ?? defaultValue; 
    const onSetValue = (newValue:any) => {}; 
    const onPressEnter = () => {}; 

    return {...props, value:valueAt, onSetValue, onPressEnter} 
  }

  // Creates new elements 
  function Create (newValue:any) { 
    props.onSetValue([...value, newValue]); 
  }; 
  // Update existing new elements 
  function Update (at:number, newValue:any) { 
    const copy = [...value]; 
    copy[at] = newValue; 
    props.onSetValue(copy); 
  }; 
  // Delete existing elements 
  function Delete (at:number) { 
    const copy = [...value]; 
    copy.splice(at,1); 
    props.onSetValue(copy); 
  }; 

  return {...props, type, value, defaultValue, ElementArgs, Create, Update, Delete}; 
}
