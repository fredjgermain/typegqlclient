import React, { useContext, useState, useEffect } from "react"; 
import { EnumCrud } from "../../dao/dao.class";



// --------------------------------------------------------
import { DaoContext } from "../../dao/daocontexter.component"; 
import { InputSelect } from "../../inputs"; 
import { IsEmpty, ReduceToString } from "../../utils"; 



// MODEL SELECTOR ================================================ 
export const ModelSelectorContext = React.createContext({} as ReturnType<typeof useModelSelector>); 
export function useModelSelector(modelsName:string[]) { 
  const {dao} = useContext(DaoContext); 

  // State --------------------------------------------------------- 
  type TModelsData = typeof defaultModelsData; 
  const defaultModelsData = { 
    models:[] as IModel[], 
    model:{} as IModel, 
    entries: [] as IEntry[], 
    defaultEntry: {} as IEntry, 
    ifieldsOptions:{} as { [key:string]:IOption[] }, 
  } 

  const [modelsData, setModelsData] = useState(defaultModelsData); 
  // Partial Setter or reset to defaultModelsData 
  function SetModelsData(newModelsData:Partial<TModelsData> = defaultModelsData) { 
    setModelsData( prev => { return {...prev, ...newModelsData} }) 
  } 

  // refretch all model and reset state when modelsNames changes 
  useEffect(() => { FetchModels(modelsName) }, [ReduceToString(modelsName)]) 

  // refetch entries when changing selected model 
  useEffect(() => { 
    if(IsEmpty(modelsData.model)) return; 
    FetchEntries(modelsData.model) 
  }, [modelsData.model.accessor]) 

  // Fetchers --------------------------------------------- 
  async function FetchModels(modelsName:string[]) { 
    await dao.ModelDescriptors({modelsName}) 
      .then( models => SetModelsData({...defaultModelsData, models}) ); 
  } 

  async function FetchEntries(model:IModel = modelsData.model) { 
    const modelName = model.accessor; 
    if(IsEmpty(modelName)) return; 
    await dao.Read({modelName}) 
      .then( entries => SetModelsData({entries})) 
  } 

  // Selector ---------------------------------------------- 
  async function SelectModel(model:IModel) { 
    if(IsEmpty(model)) return; 
    const modelName = model.accessor; 
    const defaultEntry = dao.GetDefaultEntry(model); 
    const ifieldsOptions = await dao.GetOptionsFromModel(model); 
    //const entries = await dao.Read({modelName}); 
    SetModelsData({model, defaultEntry, ifieldsOptions}) 
  } 

  const SelectModelArgs:React.ComponentProps<typeof InputSelect> = { 
    value: modelsData.model.accessor, 
    SetValue: (selectedModelAccessor:string) => { 
      const model = modelsData.models.find( model => model.accessor === selectedModelAccessor) ?? defaultModelsData.model; 
      SelectModel(model) 
    }, 
    options: modelsData.models.map( model => {return {label:model.label[0], value:model.accessor}} ) as IOption[], 
    multiple:false, 
  } 
  
  function ModelSelector() { return <InputSelect {...SelectModelArgs} /> } 

  return {modelsData, SetModelsData, FetchEntries, ModelSelector} 
} 



// SELECT ENTRY ACTION ================================================ 
export const SelectEntryActionContext = React.createContext({} as ReturnType<typeof useSelectEntryAction>) 
export function useSelectEntryAction({entry, action = EnumCrud.Create}:{entry:IEntry, action?:EnumCrud}) { 

  // State --------------------------------------------------------- 
  type TSelectEntryAction = typeof defaultSelectEntryAction; 
  const defaultSelectEntryAction = { entry, action } 
  
  const [selectEntryAction, setSelectEntryAction] = useState(defaultSelectEntryAction); 
  function SetSelectEntry(newSelectEntryAction:Partial<TSelectEntryAction> = defaultSelectEntryAction) { 
    setSelectEntryAction( prev => { return { ...prev, ...newSelectEntryAction} } ) 
  } 

  return {selectEntryAction, SetSelectEntry}; 
} 



// CRUD ENTRY ================================================
export const CrudEntryContext = React.createContext({} as ReturnType<typeof useCrudEntry>)
export function useCrudEntry() { 
  const {dao} = useContext(DaoContext); 
  const { modelsData:{model}, FetchEntries } = useContext(ModelSelectorContext); 
  const {selectEntryAction:{entry, action}} = useContext(SelectEntryActionContext); 

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
        SetCrudEntry({...defaultCrudEntry, feedback}) 
      }) 
      .catch( errors => { 
        const feedback = {action, success:false, feedback:errors}; 
        SetCrudEntry({feedback}) 
      })
  }

  async function Submit() { 
    const {action, entry} = crudEntry; 
    const variables = action === EnumCrud.Delete ? {ids:[entry._id]} : {inputs:[entry]} 
    await FetchMutation({action, variables}) 
      .then( () => FetchEntries() ); 
  } 

  function Cancel() { 
    SetCrudEntry(); 
  } 

  return {crudEntry, SetCrudEntry, Submit, Cancel} 
}







export function useModelsFetcher(modelsName:string[]) { 
  const {dao} = useContext(DaoContext); 

  const [models, setModels] = useState([] as IModel[]); 
  async function FetchModels(modelsName:string[]) { 
    await dao.ModelDescriptors({modelsName}) 
      .then( models => setModels(models) ); 
  } 

  useEffect(() => { 
    FetchModels(modelsName) 
   }, []); 

  return {models}; 
}