import { useContext } from 'react'; 



// -------------------------------------------------------- 
import { EntryEditor } from '../../entryreadereditor/entryeditor.component'; 
import { CrudEntryContext, ModelSelectorContext, useCrudEntry } 
  from '../hooks/usecollectionselector.hook'; 
import { CrudFeedback } from './feedback.component';



export function CrudEntryEditor() { 
  const {modelsData:{model:{ifields}, ifieldsOptions}} = useContext(ModelSelectorContext); 
  const useentry = useCrudEntry(); 
  const {crudEntry:{entry, action}, SetCrudEntry, Submit, Cancel} = useentry; 
  function SetEntry(newEntry:IEntry) { 
    SetCrudEntry({entry:newEntry}) 
  } 

  const SubmitCancelBtn = () => <span> 
      <button onClick={Submit}>{action.toUpperCase()}</button> 
      <button onClick={Cancel}>Cancel</button> 
    </span> 

  return <CrudEntryContext.Provider value={useentry} > 
    <CrudFeedback /> 
    <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
    <SubmitCancelBtn /> 
  </CrudEntryContext.Provider> 
} 




// export const CrudEntryContext = React.createContext({} as ReturnType<typeof useCrudEntry>); 
// export function CrudEntryEditor() { 
//   const usecrudentrycontext = useCrudEntry(); 
//   const {entry, SetEntry, ifields, ifieldsOptions} = usecrudentrycontext; 

//   return <CrudEntryContext.Provider value={usecrudentrycontext}> 
//     <div>
//       <div> 
//         Entry <br/> 
//         {JSON.stringify(entry)} 
//       </div> 
//       <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
//       <CrudCollectionSubmitBtn /> 
//     </div>
//   </CrudEntryContext.Provider> 
// }

