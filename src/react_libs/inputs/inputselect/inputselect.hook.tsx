import React from 'react'; 


// --------------------------------------------------------
import { AreEqual, PickOptions, SelectUnselect } from '../../../utils/utils'; 
import { useToggle } from '../../customhooks/usetoggle.hook'; 

type IInputSelect = { 
  value:any; 
  placeholder?:string; 
  SetValue: (newValues:any|any[]) => void; 
  options: IOption[]; 
  multiple?: boolean; 
  sizeFunc?: (value:any) => number; 
} 

const defaultInputSelect = { 
  value: undefined as any, 
  placeholder: "---Empty---", 
  SetValue: ((newValues:any|any[]) => {}), 
  options: [] as IOption[], 
  multiple: false, 
  sizeFunc: ((value:any) => 10), 
} 


export const InputSelectContext = React.createContext({} as ReturnType<typeof useInputSelect>); 
/** useInputSelect ======================================== 
 * 
 * @param props 
 * @returns 
 */
export function useInputSelect(props:IInputSelect) { 
  //const _props = {...props, ...defaultInputSelect}; 
  const {toggle, SetToggle, toggleAttribute} = useToggle(); 

  // initalize properties to default values. 
  props.multiple = props.multiple ?? false; 
  props.options = props.options ?? []; 
  props.placeholder = props.placeholder ?? "---Empty---"; 

  const selection = PickOptions(props.value, props.options); 

  // SelectValue ................................
  function SelectValue (newValue:any) { 
    const selectedValues = SelectUnselect(newValue, selection.map(o => o.value)); 
    props.SetValue( props.multiple ? selectedValues: [...selectedValues].pop() ); 
    // Close options after selection an option in a SingleSelector
    if(!props.multiple) 
      SetToggle(false); 
  } 

  function IsSelected(option:IOption) { 
    return selection.some(o => AreEqual(o?.value, option?.value)); 
  } 

  return {...props, toggle, SetToggle, toggleAttribute, selection, SelectValue, IsSelected}; 
}

