import { useState, useContext } from "react"; 

// ---------------------------------------------------------------- 
import { RowContext, TableContext } from '../../../libs/components/table/_table'; 
import { AdminTableContext } from "./admintable.component"; 


export interface IUseEdition { 
  entry: IEntry | undefined; 
  SetEntry: (modEntry?: IEntry | undefined) => void; 
  mode: string; 
  SetMode: (mode: string) => void; 
} 
export function useEdition():IUseEdition { 
  const [entry, setEntry] = useState<IEntry|undefined>(undefined); 
  const [mode, setMode] = useState(''); 

  function SetMode(mode:string) { 
    setMode(mode); 
  } 

  function SetEntry(modEntry?:IEntry) { 
    setEntry(modEntry) 
  } 

  return {entry, SetEntry, mode, SetMode} 
} 


export function EditBtns({mode}:{mode:string}) { 
  const { entries, useedition:{SetMode, SetEntry}, defaultEntry} = useContext(AdminTableContext); 
  const {row} = useContext(RowContext); 
  const entry = mode==='create' ? defaultEntry: entries.find( e => e._id === row ) ?? undefined; 

  function OpenEditor() { 
    SetMode(mode) 
    SetEntry(entry) 
  } 

  function DeleteEntry() { 
    SetMode('delete') 
    SetEntry(entry) 
  } 

  return <span> 
    <button onClick={OpenEditor}> Update {row}</button> 
    <button onClick={DeleteEntry}> Delete {row}</button> 
  </span> 
}

