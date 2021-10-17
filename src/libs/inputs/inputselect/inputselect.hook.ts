// --------------------------------------------------------
import { AreEqual, PickOptions, SelectUnselect } from '../../utils'; 
import { useToggle } from '../../customhooks/usetoggle.hook'; 

type IInputSelect = { 
  value:any; 
  placeholder?:string; 
  SetValue: (newValues:any|any[]) => void; 
  options: IOption[]; 
  multiple?: boolean; 
  sizeFunc?: (value:any) => number; 
} 


/** useInputSelect ======================================== 
 * 
 * @param props 
 * @returns 
 */
export function useInputSelect(props:IInputSelect) { 
  const {toggle, SetToggle, toggleAttribute} = useToggle(); 

  // initalize properties to default values. 
  props.multiple = props.multiple ?? false; 
  props.options = props.options ?? []; 
  props.placeholder = props.placeholder ?? "---Empty---"; 

  const selection = PickOptions(props.value, props.options); 

  // SelectValue ................................
  function SelectValue (newValue:any) { 
    const selectedValues = SelectUnselect(newValue, selection); 
    const selectedOptions = PickOptions(selectedValues, props.options); 

    props.SetValue(props.multiple ? 
      selectedOptions.map(o => o.value): 
      selectedOptions.shift()?.value); 
    // Close options after selection an option in a SingleSelector
    if(!props.multiple) 
      SetToggle(false); 
  } 

  function IsSelected(option:IOption) { 
    return selection.some(o => AreEqual(o?.value, option?.value)); 
  } 

  return {...props, toggle, SetToggle, toggleAttribute, selection, SelectValue, IsSelected}; 
}



// export function useInputSelect(props:IInputSelect) { 
//   const {toggle, SetToggle, toggleAttribute} = useToggle(); 

//   // initalize properties to default values. 
//   props.multiple = props.multiple ?? false; 
//   props.options = props.options ?? []; 
//   props.placeholder = props.placeholder ?? "---Empty---"; 

//   function PickSelectedOptions(value:any, options:IOption[]):IOption[] { 
//     return Pick(options, ToArray(value), (o, v) => AreEqual(o.value, v)) 
//   }

//   const selection = PickSelectedOptions(props.value, props.options); 

//   // SelectValue ................................
//   function SelectValue (newValue:any) { 
//     const [inclusion, exclusion] = Filter(ToArray(props.value), ({t}) => AreEqual(t, newValue)); 
//     if(IsEmpty(inclusion) && props.multiple) 
//       exclusion.push(newValue); 
//     if(IsEmpty(inclusion) && !props.multiple) 
//       exclusion[0] = newValue; 
    
//     const selectionFromOptions = PickSelectedOptions(exclusion, props.options).map( o => o.value ); 
//     const selection = props.multiple ? selectionFromOptions: selectionFromOptions.shift(); 

//     props.SetValue(selection); 

//     // Close options after selection an option in a SingleSelector
//     if(!props.multiple) 
//       SetToggle(false); 
//   } 

//   function IsSelected(option:IOption) { 
//     return selection.some(o => AreEqual(o?.value, option?.value)); 
//   } 

//   return {...props, toggle, SetToggle, toggleAttribute, selection, SelectValue, IsSelected}; 
// }



