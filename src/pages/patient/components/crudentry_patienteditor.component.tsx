import React, {useContext} from 'react'; 

// --------------------------------------------------------
import { CrudConfirmCancelBtn, CrudEntryContext } from '../../../react_libs/crudentry'; 
import { CrudEntry_FieldEditor } from '../../common/crudentry_fieldeditor.component'; 


export function CrudEntry_PatientEditor() { 
  const {crudEntry:{model, action, entries}} = useContext(CrudEntryContext); 
  const editableIFields = model.ifields.filter( f => f.options?.editable ); 

  return <div> 
    {entries.map( (entry, i) => { 
      const logout = `${JSON.stringify(entry.ramq)} + ${JSON.stringify(entry.abbrev)}`; 
      return <div key={i}>{logout}</div> 
    })} 
    
    <span>Instruction ... {action} a new profile. </span> <br/> 
    {editableIFields.map( (ifield, i) => {return <CrudEntry_FieldEditor key={i} {...{ifield}}/>})} 
    <CrudConfirmCancelBtn/> 
  </div> 
} 
