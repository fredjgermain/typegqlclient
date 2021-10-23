import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { CrudEntryContext } 
  from '../../react_libs/crudentry'; 
import { FieldEditor } from '../../react_libs/entryreadereditor/fieldeditor.component'; 



export function CrudEntry_FieldEditor({ifield}:{ifield:IField}) { 
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