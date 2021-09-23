import { useState, useContext } from "react"; 

// ---------------------------------------------------------------- 
import { RowContext } from '../../../libs/table/_table'; 
import { AdminTableContext } from "./admintable.component"; 


export type IUseEdition = ReturnType<typeof useEditEntry>; 
export function useEditEntry() { 
  const [entry, setEntry] = useState<IEntry>({} as IEntry); 
  const [mode, setMode] = useState('read'); 
  const [feedback, setFeedback] = useState([]); 

  function SetMode(mode?:string) { 
    setMode(mode?? 'read'); 
  } 

  function SetEntry(modEntry?:IEntry) { 
    setEntry((modEntry ?? {}) as IEntry) 
  } 

  function SetFeedback(newFeedback:any) { 
    setFeedback(newFeedback); 
  } 

  return {entry, SetEntry, mode, SetMode, feedback, SetFeedback} 
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

