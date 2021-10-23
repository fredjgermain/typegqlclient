


// -------------------------------------------------------- 
import { InputArray } from "../inputs/inputarray/inputarray.component"; 
import { InputScalar } from "../inputs/inputscalar/inputscalar.component"; 
import { InputSelect } from "../inputs/inputselect/inputselect"; 
import { IsEmpty } from "../../utils/utils"; 
import { DisplayField } from "../inputs";



export function FieldEditor({entry, SetEntry, ifield, options}:{
    entry:IEntry, 
    SetEntry:(newEntry:IEntry)=>void,  
    ifield:IField, 
    options:IOption[]
  }) { 
  const value = entry[ifield.accessor] ?? ifield.type.defaultValue; 

  const SetValue = (newValue:any) => { 
    const modEntry = {...entry}; 
    modEntry[ifield.accessor] = newValue; 
    SetEntry(modEntry); 
  } 

  const valueType = ifield.type.name; 

  // InputSelect / InputArray / InputScalar 
  const InputComponent = 
    !IsEmpty(options) ? <InputSelect {...{value, SetValue, options, multiple:ifield.type.isArray}} /> : 
      ifield.type.isArray ? <InputArray {...{values:value, SetValues:SetValue, valueType}} /> : 
        <InputScalar {...{value, SetValue, valueType}} /> 

  if(!ifield.options?.editable) 
    return <DisplayField {...{entry, ifield, options}} /> 
  return <span>{InputComponent}</span>
} 


