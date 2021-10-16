import React, { useContext, useState, useEffect } from "react"; 


// --------------------------------------------------------
import { EnumCrud } from "../../dao/dao.class"; 
import { DaoContext } from "../../dao/daocontexter.component"; 
import { IsEmpty } from "../../utils";



export const CrudEntryContext = React.createContext({} as ReturnType<typeof useCrudEntry>); 
export function useCrudEntry({
    model, 
    entry = {} as IEntry, 
    defaultEntry = {} as IEntry, 
    action = EnumCrud.Read, 
    abbrevfield = '' 
  }:{ 
    model:IModel, 
    entry?:IEntry, 
    defaultEntry?:IEntry, 
    action?:EnumCrud, 
    abbrevfield?:string 
  }) { 

  type TCrudEntry = typeof defaultCrudEntry; 
  const defaultCrudEntry = { model, entry, defaultEntry, action, abbrevfield, 
    entries: [] as IEntry[], 
    feedback: { 
      action:EnumCrud.Create, 
      input:{} as any, 
      success:false, 
      feedback:{} as any
    }, 
    ifieldsOptions: {} as { [key:string]:IOption[] }, 
  } 

  const {dao} = useContext(DaoContext); 
  const modelName = model?.accessor ?? ''; 

  // State ------------------------------------------------
  const [crudEntry, setCrudEntry] = useState(defaultCrudEntry); 
  function SetCrudEntry(newCrudEntry:Partial<TCrudEntry>) { 
    setCrudEntry( prev => { return {...prev, ...newCrudEntry} }); 
  } 

  // Initialize CrudEntry State 
  async function InitCrudEntry() { 
    if(IsEmpty(model)) return; 
    const defaultEntry = IsEmpty(defaultCrudEntry.defaultEntry) ? dao.GetDefaultEntry(model): defaultCrudEntry.defaultEntry; 
    const entry = IsEmpty(defaultCrudEntry.entry) ? defaultEntry: defaultCrudEntry.entry; 
    const abbrevfield = IsEmpty(defaultCrudEntry.abbrevfield) ? await dao.GetAbbrevIField(model): defaultCrudEntry.abbrevfield; 
    const entries = await dao.Read({modelName:model.accessor}); 
    const ifieldsOptions = await dao.GetOptionsFromModel(model); 
    SetCrudEntry({entry, defaultEntry, entries, ifieldsOptions, abbrevfield}) 
  } 

  useEffect( () => { InitCrudEntry() }, []) 

  // CRUD FUNCTIONALITIES ------------------------------------
  async function Mutation({action, variables}:{action:EnumCrud, variables:any}) { 
    if(!modelName) return; 
    const mutationPromise = (dao as any)[action]({modelName, ...variables}) as Promise<IEntry[]>; 
    await mutationPromise 
      .then( async results => { 
        const feedback = {action, success:true, feedback:results, input:results[0]}; 
        const entries = await dao.Read({modelName}); 
        const entry = crudEntry.defaultEntry; 
        SetCrudEntry({action:defaultCrudEntry.action, entry, feedback, entries}); 
      }) 
      .catch( errors => { 
        const feedback = {action, success:false, feedback:errors, input:variables}; 
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

  // Set/SelectEntry --------------------------------------
  function SelectEntry({
      entry = defaultCrudEntry.defaultEntry, 
      action = defaultCrudEntry.action}:{ 
        entry?:IEntry, action?:EnumCrud}) { 
    const feedback = defaultCrudEntry.feedback; 
    SetCrudEntry({entry, action, feedback}) 
  } 

  function SetEntry(entry:IEntry) { 
    SetCrudEntry({entry}); 
  } 

  // Validation -------------------------------------------
  function EntryValidation() { 
    const editableFields = crudEntry.model.ifields.filter( f => f.options?.editable ) 
    return editableFields.every( f => FieldValidation(f) ) 
  } 

  function FieldValidation(ifield:IField) { 
    const value = crudEntry.entry[ifield.accessor]; 
    if(ifield.options?.required && IsEmpty(value)) 
      return false; 
    if( ifield.options?.regex && !(new RegExp(ifield.options.regex).test(value ?? '')) ) 
      return false; 
    return true; 
  }

  return {crudEntry, SelectEntry, SetEntry, EntryValidation, FieldValidation, Submit, Cancel} 
}