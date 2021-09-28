import React, { useContext } from 'react';



// -------------------------------------------------------- 
import { EntryEditor } from '../../entryreadereditor/entryeditor.component'; 
import { CrudFeedback } from './feedback.component'; 
import { CrudCollectionSubmitBtn } from './submitbtn.component';
import { CrudCollectionContext } from '../crudcollection.component';



export function CrudEntryEditor() {
  const {data, crud, SetCrud} = useContext(CrudCollectionContext); 
  const {model, entries} = data; 

  const entry = crud.entry ?? data.defaultEntry; 
  function SetEntry(entry:IEntry) { 
    SetCrud({entry}) 
  } 

  // filter readable and editable ifields 
  // add option 'editable' to those editable ifields 
  const ifields = (model?.ifields ?? [] as IField[]).filter( f => f.options?.readable || f.options?.editable ) 
  const ifieldsOptions = data.ifieldsOptions ?? {}; 

  return <div>
    <div> 
      Entry <br/> 
      {JSON.stringify(entry)} 
    </div> 
    <CrudFeedback/> 
    <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 

    <CrudCollectionSubmitBtn/>  
  </div>
}
