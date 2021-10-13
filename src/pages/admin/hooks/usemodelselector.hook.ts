import React, { useContext, useState } from "react"; 


// --------------------------------------------------------
import { DaoContext } from "../../dao/daocontexter.component"; 
import { InputSelect } from "../../inputs"; 
import { IsEmpty } from "../../utils"; 



// MODEL SELECTOR ================================================ 
export const ModelSelectorContext = React.createContext({} as ReturnType<typeof useModelSelector>); 
export function useModelSelector(models:IModel[] = []) { 
  const {dao} = useContext(DaoContext); 

  // State --------------------------------------------------------- 
  type TModelsData = typeof defaultModelSelection; 
  const defaultModelSelection = { 
    model:{} as IModel, 
    entries: [] as IEntry[], 
    defaultEntry: {} as IEntry, 
    ifieldsOptions:{} as { [key:string]:IOption[] }, 
  } 

  const [modelData, setModelData] = useState(defaultModelSelection); 
  function SetModelsData(newModelsData:Partial<TModelsData> = defaultModelSelection) { 
    setModelData( prev => { return {...prev, ...newModelsData} }) 
  } 

  // Fetchers --------------------------------------------- 
  async function FetchEntries(modelName:string = modelData.model?.accessor) { 
    if(IsEmpty(modelName)) return; 
    await dao.Read({modelName}) 
      .then( entries => SetModelsData({entries})) 
  } 

  // Selector ---------------------------------------------- 
  async function SelectModel(model:IModel) { 
    if(IsEmpty(model)) return; 
    const defaultEntry = dao.GetDefaultEntry(model); 
    const ifieldsOptions = await dao.GetOptionsFromModel(model); 
    const entries = await dao.Read({modelName:model.accessor}); 
    SetModelsData({model, defaultEntry, entries, ifieldsOptions}) 
  } 

  const SelectModelArgs:React.ComponentProps<typeof InputSelect> = { 
    value: modelData.model, 
    SetValue: (selectedAccessor:IModel) => { 
      const model = models.find( model => model === selectedAccessor) 
        ?? defaultModelSelection.model; 
      SelectModel(model) 
    }, 
    options: models.map( model => { 
      return {label:model.label[0], value:model} 
    }) as IOption[], 
    multiple:false, 
  } 

  return {modelData, SetModelsData, FetchEntries, SelectModelArgs} 
} 


