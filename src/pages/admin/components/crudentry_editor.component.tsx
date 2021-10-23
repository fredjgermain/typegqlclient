import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { CrudEntryContext, CrudFeedback, 
  CrudCreateBtn, CrudConfirmCancelBtn } 
  from '../../../react_libs/crudentry'; 
import { EnumCrud } from '../../../dao/dao.class'; 
import { CrudEditor_TitleInstructions } from './crudeditor_titleinstructions.component'; 
import { CrudEntry_FieldEditor } from '../../common/crudentry_fieldeditor.component';


export function CrudEditorSection() { 
  const {crudEntry:{action}} = useContext(CrudEntryContext); 

  return <div> 
    <CrudEditor_TitleInstructions/> 
    <br/> 
    <CrudFeedback/> 
    <br/> 
    {action != EnumCrud.Read && <CrudEntry_Editor /> } 
    {action != EnumCrud.Read && <br/> } 
    {action === EnumCrud.Read ? <CrudCreateBtn/> : <CrudConfirmCancelBtn/> } 
  </div> 
} 


function CrudEntry_Editor() { 
  const {crudEntry:{model}} = useContext(CrudEntryContext); 
  //const _idfield = model.ifields.filter( f => f.accessor === '_id') ?? []; 
  const editablefields = model.ifields.filter( f => f.options?.editable ); 
  const ifields = [...editablefields] 

  return <div> 
    {ifields.map( (ifield, i) => {return <CrudEntry_FieldEditor key={i} {...{ifield}}/>})} 
  </div> 
} 
