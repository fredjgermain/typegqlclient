import { useContext } from 'react'; 



// -------------------------------------------------------- 
import { EntryEditor } from '../../../libs/entryreadereditor/entryeditor.component'; 
import { useCrudEntry, CrudEntryContext } from '../hooks/usecrudentry.hook'; 
import { ModelSelectorContext } from '../hooks/usemodelselector.hook'; 
import { CrudFeedback } from './feedback.component'; 



export function CrudEntryEditor() { 
  const {modelData:{model:{ifields}, ifieldsOptions}} = useContext(ModelSelectorContext); 
  const crudentry = useCrudEntry(); 
  const {crudEntry:{entry, action}, SetCrudEntry} = crudentry; 
  function SetEntry(newEntry:IEntry) { 
    SetCrudEntry({entry:newEntry}) 
  } 

  return <CrudEntryContext.Provider value={crudentry} > 
    <div>
      {JSON.stringify(action)} {JSON.stringify(entry)} 
    </div>
    <CrudFeedback /> 
    <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
    <SubmitCancelBtn /> 
  </CrudEntryContext.Provider> 
} 

export function SubmitCancelBtn() {
  const {crudEntry:{action}, Submit, Cancel} = useContext(CrudEntryContext); 

  return <span> 
      <button onClick={Submit}>{action.toUpperCase()}</button> 
      <button onClick={Cancel}>Cancel</button> 
    </span> 
}