import React from 'react';



// -------------------------------------------------------- 
import { EntryEditor } from '../entryreadereditor/entryeditor.component'; 
import { CrudFeedback } from './crudcollection.feedback.component'; 
import { useCrud } from './crudcollection.hooks'; 
import { CrudCollectionSubmitBtn } from './crudcollection.submitbtn.component';
import { CrudCollectionTable } from './crudcollection.table.component'; 



// --------------------------------------------------------
export const CrudCollectionContext = React.createContext({} as ReturnType<typeof useCrud>); 
export function CrudCollection({modelName}:{modelName:string}) { 
  const usecrudcontext = useCrud({modelName}) 
  const {data, crudStatus, SetCrudStatus} = usecrudcontext; 
  const {mode} = crudStatus; 
  const {model} = data; 

  const entry = crudStatus.entry ?? {} as IEntry; 
  function SetEntry(entry:IEntry) { 
    SetCrudStatus({entry}) 
  } 

  // filter readable and editable ifields 
  // add option 'editable' to those editable ifields 
  const ifields = (model?.ifields ?? [] as IField[]).filter( f => f.options?.readable || f.options?.editable ) 
  const ifieldsOptions = data.ifieldsOptions ?? {}; 

  return <CrudCollectionContext.Provider value={usecrudcontext} > 
    <div> 
      <div> 
        Entry <br/> 
        {JSON.stringify(entry)} 
      </div> 

      <CrudFeedback/> 

      <h4>{mode} : {model?.accessor}</h4> 
      <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 

      <CrudCollectionSubmitBtn/> 

      <CrudCollectionTable /> 
    </div> 
  </CrudCollectionContext.Provider> 
} 