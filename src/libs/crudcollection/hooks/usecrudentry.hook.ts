import React, { useContext, useEffect, useState } from 'react';



// -------------------------------------------------------- 
import { CrudCollectionContext } from '../crudcollection.component'; 
import { IsEmpty } from '../../utils'; 


export function useCrudEntry() { 
  console.log('useCrudEntry'); 
  const {data, Cancel:_Cancel, Submit:_Submit } = useContext(CrudCollectionContext); 
  const {model} = data; 

  const _entry = IsEmpty(data.entry) ? data.defaultEntry: data.entry; 
  const [entry, setEntry] = useState(_entry); 
  function SetEntry(entry?:IEntry) { 
    setEntry(entry ?? _entry); 
  } 

  async function Submit() { 
    await _Submit(entry); 
    _Cancel(); SetEntry(); 
  } 

  function Cancel() { 
    _Cancel(); SetEntry(); 
  } 

  useEffect(() => { 
    SetEntry(_entry) 
  }, [`${data.mode}:${_entry._id}`]) 

  // filter readable and editable ifields 
  // add option 'editable' to those editable ifields 
  const ifields = (model?.ifields ?? [] as IField[]).filter( f => f.options?.readable || f.options?.editable ) 
  const ifieldsOptions = data.ifieldsOptions ?? {}; 
  return {entry, SetEntry, ifields, ifieldsOptions, Submit, Cancel}; 
}