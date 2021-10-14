import React, { useContext, useState, useEffect } from "react"; 


// --------------------------------------------------------
import { EnumCrud } from "../../dao/dao.class"; 
import { DaoContext } from "../../dao/daocontexter.component"; 
import { IsEmpty } from "../../utils";



export const CrudEntryContext = React.createContext({} as ReturnType<typeof useCrudEntry>); 
export function useCrudEntry(model:IModel) { 
  const {dao} = useContext(DaoContext); 
  const modelName = model?.accessor ?? ''; 


  // State ------------------------------------------------
  type TCrudEntry = typeof defaultCrudEntry; 
  const defaultCrudEntry = { 
    model:model, 
    defaultEntry:{} as IEntry, 
    ifieldsOptions: {} as { [key:string]:IOption[] }, 
    entries: {} as IEntry[], 

    entry:{} as IEntry, 
    action: EnumCrud.Create as EnumCrud, 
    feedback: {action: EnumCrud.Create, success:false, feedback:{} as any}, 
  } 
  const [crudEntry, setCrudEntry] = useState(defaultCrudEntry); 
  function SetCrudEntry(newCrudEntry:Partial<TCrudEntry>) { 
    setCrudEntry( prev => { return {...prev, ...newCrudEntry} }); 
  } 


  // Initialize CrudEntry State 
  async function InitCrudEntry() { 
    if(IsEmpty(model)) return; 
    const defaultEntry = dao.GetDefaultEntry(model); 
    const entry = defaultEntry; 
    const ifieldsOptions = await dao.GetOptionsFromModel(model); 
    const entries = await dao.Read({modelName:model.accessor}); 
    SetCrudEntry({entry, defaultEntry, entries, ifieldsOptions}) 
  } 

  useEffect( () => { InitCrudEntry() }, []) 

  // CRUD FUNCTIONALITIES ------------------------------------
  async function Mutation({action, variables}:{action:EnumCrud, variables:any}) { 
    if(!modelName) return; 
    const mutationPromise = (dao as any)[action]({modelName, ...variables}) as Promise<IEntry[]>; 
    await mutationPromise 
      .then( async results => { 
        const feedback = {action, success:true, feedback:results}; 
        const entries = await dao.Read({modelName}); 
        const entry = crudEntry.defaultEntry; 
        SetCrudEntry({action:defaultCrudEntry.action, entry, feedback, entries}); 
      }) 
      .catch( errors => { 
        const feedback = {action, success:false, feedback:errors}; 
        SetCrudEntry({feedback}) 
      })
  }

  async function Submit() { 
    const {action, entry} = crudEntry; 
    const variables = action === EnumCrud.Delete ? {ids:[entry._id]} : {inputs:[entry]} 
    await Mutation({action, variables}) 
  } 

  function Cancel() { 
    const {action, feedback} = defaultCrudEntry; 
    const entry = crudEntry.defaultEntry; 
    SetCrudEntry({action, entry, feedback}); 
  } 

  function SelectEntry({entry, action}:{entry:IEntry, action:EnumCrud}) { 
    SetCrudEntry({entry, action}) 
  } 

  function SetEntry(entry:IEntry) { 
    SetCrudEntry({entry}); 
  } 

  return {crudEntry, SelectEntry, SetEntry, Submit, Cancel} 
}