import { useContext } from "react";



// -------------------------------------------------------- 
import { InputArray } from "../inputs/inputarray/inputarray.component"; 
import { InputScalar } from "../inputs/inputscalar/inputscalar.component"; 
import { InputSelect } from "../inputs/inputselect/inputselect"; 
import { IsEmpty } from "../utils"; 
import { EntryEditorContext } from './entryeditor.component'; 



/* 
takes a specific field. 
gets context from EditEntry, deconstructs entry, SetEntry. 

display either available value from entry or default value given by ifield. 
display field appropriately according to their respective types. 
display field to edit entry using SetEntry. 

*/ 
export function FieldEditor({ifield}:{ifield:IField}) { 
  const {entry, SetEntry, ifieldsOptions} = useContext(EntryEditorContext); 

  const value = entry[ifield.accessor] ?? ifield.type.defaultValue; 
  const options = (ifieldsOptions??{})[ifield.accessor]; 

  const SetValue = (newValue:any) => { 
    const modEntry = {...entry}; 
    modEntry[ifield.accessor] = newValue; 
    SetEntry(modEntry); 
  }

  const Label = `${ifield.label} : `; 
  const valueType = ifield.type.name; 
  //console.log(ifield.type.name); 
  

  // InputSelect, if options is not null 
  if(!IsEmpty(options)) 
    return <div> 
      {Label} <InputSelect {...{value, SetValue, options, multiple:ifield.type.isArray}} /> 
    </div> 
  // InputArray 
  if(ifield.type.isArray) 
    return <div> 
      {Label} <InputArray {...{values:value, SetValues:SetValue, valueType}} /> 
    </div> 
  // InputScalar
  return <div> 
    {Label} <InputScalar {...{value, SetValue, valueType}} /> 
  </div> 
}