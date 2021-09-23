import React from "react"; 



// -------------------------------------------------------- 
import { FieldEditor } from './fieldeditor.component'; 

// !!! ENTRY MUST NOT BE UNDEFINED OR NULL  !!!


export interface IEditEntry {
  entry:IEntry, 
  SetEntry:(newEntry:IEntry)=>void, 
  ifieldsOptions: {[key:string]:IOption[]}, 
  ifields:IField[] 
}
export const EntryEditorContext = React.createContext({} as IEditEntry) 
export function EntryEditor({entry, SetEntry, ifieldsOptions, ifields}:IEditEntry) { 

  return <EntryEditorContext.Provider value={{entry, SetEntry, ifieldsOptions, ifields}} > 
    <div>{JSON.stringify(entry)}</div> 
    
    <div> 
      {ifields.map( ifield => { 
        return <FieldEditor key={ifield.accessor} {...{ifield}} /> 
      })} 
    </div> 
  </EntryEditorContext.Provider> 
} 