import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { CrudEntryContext, 
  CrudFeedback, CrudCreateBtn, CrudConfirmCancelBtn } 
  from '../../../libs/crudentry'; 
import { EnumCrud } from '../../../libs/dao/dao.class'; 
import { EntryEditor } from '../../../libs/entryreadereditor/entryeditor.component'; 
import { CrudEditor_TitleInstructions } from './crudeditor_titleinstructions.component'; 


export function CrudEditor() { 
  const {crudEntry:{action, model:{ifields}, entry, ifieldsOptions}, SetEntry} = useContext(CrudEntryContext); 

  return <div> 
    <CrudEditor_TitleInstructions/> 
    <br/> 
    <CrudFeedback/> 
    {action != EnumCrud.Read && <br/> } 
    {action != EnumCrud.Read && <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> } 
    <br/> 
    {action === EnumCrud.Read ? <CrudCreateBtn/> : <CrudConfirmCancelBtn/> } 
  </div> 
} 