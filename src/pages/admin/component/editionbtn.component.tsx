import { useState, useContext } from "react"; 

// ---------------------------------------------------------------- 
import { RowContext } from '../../../libs/table/_table'; 
import { AdminTableContext } from "./admintable.component"; 


export type IUseEdition = ReturnType<typeof useEditEntry>; 
export function useEditEntry() { 
  const [entry, setEntry] = useState<IEntry>({} as IEntry); 
  const [mode, setMode] = useState(''); 

  function SetMode(mode:string) { 
    setMode(mode); 
  } 

  function SetEntry(modEntry?:IEntry) { 
    setEntry((modEntry ?? {}) as IEntry) 
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


export function SubmitBtn() { 
  const { useedition:{entry, mode} } = useContext(AdminTableContext); 

  const Submit = () => { 
    console.log(mode, entry) 
  }

  return <button onClick={Submit}>Submit</button> 
}

export function CancelBtn() { 
  const { useedition:{SetEntry, SetMode}, defaultEntry } = useContext(AdminTableContext); 

  const Cancel = () => { 
    SetEntry(defaultEntry);  
    SetMode('read'); 
  }
  
  return <button onClick={Cancel}>Cancel</button>
}