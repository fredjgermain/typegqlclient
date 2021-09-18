// --------------------------------------------------------
import { Filter, ToArray, IsEmpty, Pick } from '../../utils'; 
import { useToggle } from '../../usetoggle/usetoggle.hook'; 


type IUseToggle = ReturnType<typeof useToggle>; 
export function useInputSelect(props:IInputSelect):IUseSelect { 
  
  const {toggle, SetToggle, toggleAttribute} = useToggle(); 

  // initalize properties to default values. 
  props.multiple = props.multiple ?? false; 
  props.options = props.options ?? []; 
  props.placeholder = props.placeholder ?? "---Empty---"; 

  function PickSelectedOptions(value:any, options:IOption[]):IOption[] { 
    return Pick(options, ToArray(value), (o, v) => o.value === v) 
  }

  const selection = PickSelectedOptions(props.value, props.options); 

  // SelectValue ................................
  function SelectValue (newValue:any) { 
    const [inclusion, exclusion] = Filter(ToArray(props.value), ({t}) => t === newValue); 
    if(IsEmpty(inclusion) && props.multiple) 
      exclusion.push(newValue); 
    if(IsEmpty(inclusion) && !props.multiple) 
      exclusion[0] = newValue; 
    
    const selectionFromOptions = PickSelectedOptions(exclusion, props.options).map( o => o.value); 
    const selection = props.multiple ? selectionFromOptions: selectionFromOptions.shift(); 

    props.SetValue(selection); 

    // Close options after selection an option in a SingleSelector
    if(!props.multiple) 
      SetToggle(false); 
  } 

  function IsSelected(option:IOption) { 
    return selection.some(o => o?.value === option?.value); 
  } 

  return {...props, toggle, SetToggle, toggleAttribute, selection, SelectValue, IsSelected}; 
}


export interface IInputSelect { 
  value:any; 
  placeholder?:string; 
  SetValue: (newValues:any[]) => void; 
  options: IOption[]; 
  multiple?: boolean; 
  sizeFunc?: (value:any) => number; 
} 

export type IUseSelect = { 
  toggle: boolean; 
  SetToggle: (toggle?:boolean) => void; 
  selection: IOption[]; 
  SelectValue:(newValue:any) => void; 
  IsSelected: (option:IOption) => boolean; 
  //GetSelection: () => IOption[]; 
} & IInputSelect & IUseToggle; 