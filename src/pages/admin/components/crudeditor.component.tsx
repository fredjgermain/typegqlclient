import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { CrudEntryContext, CrudFeedback, 
  CrudCreateBtn, CrudConfirmCancelBtn } 
  from '../../../libs/crudentry'; 
import { EnumCrud } from '../../../libs/dao/dao.class'; 
import { FieldEditor } from '../../../libs/entryreadereditor/fieldeditor.component'; 
import { CrudEditor_TitleInstructions } from './crudeditor_titleinstructions.component'; 


export function CrudEditorSection() { 
  const {crudEntry:{action}} = useContext(CrudEntryContext); 

  return <div> 
    <CrudEditor_TitleInstructions/> 
    <br/> 
    <CrudFeedback/> 
    <br/> 
    {action != EnumCrud.Read && <CrudEntryEditor /> } 
    {action != EnumCrud.Read && <br/> } 
    {action === EnumCrud.Read ? <CrudCreateBtn/> : <CrudConfirmCancelBtn/> } 
  </div> 
} 


function CrudEntryEditor() { 
  const {crudEntry:{model}} = useContext(CrudEntryContext); 
  //const _idfield = model.ifields.filter( f => f.accessor === '_id') ?? []; 
  const editablefields = model.ifields.filter( f => f.options?.editable ); 
  const ifields = [...editablefields] 

  return <div> 
    {ifields.map( (ifield, i) => {return <CrudFieldEditor key={i} {...{ifield}}/>})} 
  </div> 
} 

function CrudFieldEditor({ifield}:{ifield:IField}) { 
  const {crudEntry:{entry, ifieldsOptions}, SetEntry} = useContext(CrudEntryContext); 
  const label = `${ifield.label[0] ?? ifield.accessor} : `; 
  const options = ifieldsOptions[ifield.accessor] ?? [] as IOption[]; 
  const fieldArgs = {entry, SetEntry, ifield, options} 

  return <div key={ifield.accessor}> 
    {label} <FieldAnnotations {...{ifield}} /> 
    <FieldEditor {...fieldArgs} /> 
    <FieldValidationNotif {...{ifield}} /> 
  </div>
}


function FieldAnnotations({ifield}:{ifield:IField}) { 
  const {required, unique} = (ifield.options ?? {}) as IFieldOption; 
  const requiredAnnotation = required ? '*': ''; 
  const uniqueAnnotation = unique ? '!': ''; 
  return <span>{`${requiredAnnotation} ${uniqueAnnotation}`}</span> 
} 

function FieldValidationNotif({ifield}:{ifield:IField}) { 
  const {FieldValidation} = useContext(CrudEntryContext); 


  return <span>{FieldValidation(ifield) ? '✔': '✖' }</span> 
}