import React from 'react';


// -------------------------------------------------------- 
import { EntryEditor } from '../../entryreadereditor/entryeditor.component'; 
import { useCrudEntry } from '../hooks/usecrudentry.hook'; 
import { CrudCollectionSubmitBtn } from './submitbtn.component'; 


export const CrudEntryContext = React.createContext({} as ReturnType<typeof useCrudEntry>); 
export function CrudEntryEditor() { 
  const usecrudentrycontext = useCrudEntry(); 
  const {entry, SetEntry, ifields, ifieldsOptions} = usecrudentrycontext; 

  return <CrudEntryContext.Provider value={usecrudentrycontext}> 
    <div>
      <div> 
        Entry <br/> 
        {JSON.stringify(entry)} 
      </div> 
      <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
      <CrudCollectionSubmitBtn /> 
    </div>
  </CrudEntryContext.Provider> 
}

