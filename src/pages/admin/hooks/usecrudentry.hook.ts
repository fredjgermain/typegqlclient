import React, { useContext, useState, useEffect } from "react"; 


// --------------------------------------------------------
import { DaoContext } from "../../dao/daocontexter.component"; 
import { EnumCrud } from "../../dao/dao.class";
import { ModelSelectorContext } from "./usemodelselector.hook";
import { EntrySelectorContext } from "./useentryselector";



// CRUD ENTRY ================================================
export const CrudEntryContext = React.createContext({} as ReturnType<typeof useCrudEntry>)
export function useCrudEntry() { 
  const {dao} = useContext(DaoContext); 
  const { modelData:{model}, FetchEntries } = useContext(ModelSelectorContext); 
  const {selectedEntry:{entry, action}, SetSelectedEntry} = useContext(EntrySelectorContext); 

  type TCrudEntry = typeof defaultCrudEntry; 
  const defaultCrudEntry = { 
    entry:entry, 
    action:EnumCrud.Create as EnumCrud, 
    feedback: {action: EnumCrud.Create, success:false, feedback:{} as any}, 
  } 


  // CrudEntry state -------------------------------------- 
  const [crudEntry, setCrudEntry] = useState({...defaultCrudEntry, ...{entry, action}}); 
  function SetCrudEntry(newCrudEntry:Partial<TCrudEntry> = defaultCrudEntry) { 
    setCrudEntry( prev => { return {...prev, ...newCrudEntry} } ) 
  } 

  // refetch entries when changing selected model 
  const refreshValue = `${action}_${entry._id}`; 
  useEffect(() => { 
    SetCrudEntry({entry, action}) 
  }, [refreshValue]) 

  async function FetchMutation({action, variables}:{action:EnumCrud, variables:any}) { 
    const modelName = model.accessor; 
    if(!modelName) return; 
    const mutationPromise = (dao as any)[action]({modelName, ...variables}) as Promise<IEntry[]>; 
    await mutationPromise 
      .then( results => { 
        const feedback = {action, success:true, feedback:results}; 
        console.log(results); 
        SetCrudEntry({...defaultCrudEntry, feedback}); 
      }) 
      .catch( errors => { 
        console.log(errors); 
        const feedback = {action, success:false, feedback:errors}; 
        SetCrudEntry({feedback}) 
      })
  }

  async function Submit() { 
    const {action, entry} = crudEntry; 
    console.log(action, entry); 
    const variables = action === EnumCrud.Delete ? {ids:[entry._id]} : {inputs:[entry]} 
    await FetchMutation({action, variables}) 
      .then( () => { 
        FetchEntries(); 
        SetSelectedEntry(); 
      }); 
  } 

  function Cancel() { 
    SetCrudEntry(); 
    SetSelectedEntry(); 
  } 

  return {crudEntry, SetCrudEntry, Submit, Cancel} 
}

