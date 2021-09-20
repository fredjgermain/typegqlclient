///import {} from ''

import React, { useContext } from "react";
import { InputArray } from "../inputs/inputarray/inputarray.component";
import { InputScalar } from "../inputs/inputscalar/inputscalar.component";
import { InputSelect } from "../inputs/inputselect/inputselect";
import { IsEmpty } from "../utils";



// !!! ENTRY MUST NOT BE UNDEFINED OR NULL  !!!


/* 
takes in an entry, a SetEntry function, an array of fields, 
makes a context including entry and SetEntry. 

*/ 
export interface IEditEntry {
  entry:IEntry, 
  SetEntry:(newEntry:IEntry)=>void, 
  ifieldsOptions: {[key:string]:IOption[]}, 
  ifields:IField[] 
}
const EditEntryContext = React.createContext({} as IEditEntry) 
export function EditEntry({entry, SetEntry, ifieldsOptions, ifields}:IEditEntry) { 

  return <EditEntryContext.Provider value={{entry, SetEntry, ifieldsOptions, ifields}} > 
    <div>{JSON.stringify(entry)}</div> 
    <div> 
      {ifields.map( ifield => { 
        return <EditField key={ifield.accessor} {...{ifield}} /> 
      })} 
    </div> 
  </EditEntryContext.Provider> 
} 


/* 
takes a specific field. 
gets context from EditEntry, deconstructs entry, SetEntry. 

display either available value from entry or default value given by ifield. 
display field appropriately according to their respective types. 
display field to edit entry using SetEntry. 

*/ 
export function EditField({ifield}:{ifield:IField}) { 
  const {entry, SetEntry, ifieldsOptions} = useContext(EditEntryContext); 

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