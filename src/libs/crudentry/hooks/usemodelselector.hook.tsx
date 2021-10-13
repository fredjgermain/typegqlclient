import { useContext, useState, useEffect } from "react"; 
import { DaoContext } from "../../dao/daocontexter.component"; 
import { InputSelect } from "../../inputs"; 



export function useModelSelector(modelsName:string[]) { 
  const {dao} = useContext(DaoContext); 

  type TModelSelector = typeof defaultModelSelector; 
  const defaultModelSelector = { 
    models:[] as IModel[], 
    model: {} as IModel, 
    options: [] as IOption[], 
  } 

  const [modelSelector, setModelSelector] = useState(defaultModelSelector); 
  function SetModelSelector(newModelSelector:Partial<TModelSelector> = defaultModelSelector) { 
    setModelSelector( prev => { return {...prev, ...newModelSelector}}) 
  }

  useEffect(() => { 
    FetchModels() 
  }, []) 

  async function FetchModels() { 
    await dao.ModelDescriptors({modelsName}) 
      .then(models => SetModelSelector({models})) 
  }

  const SelectModelArgs:React.ComponentProps<typeof InputSelect> = { 
    value: modelSelector.model, 
    SetValue: (selectedAccessor:IModel) => { 
      const model = modelSelector.models.find( model => model === selectedAccessor) 
        ?? defaultModelSelector.model; 
      SetModelSelector({model}) 
    }, 
    options: modelSelector.models.map( model => { 
      return {label:model.label[0], value:model} 
    }) as IOption[], 
    multiple:false, 
  } 

  return {modelSelector, SelectModelArgs} 
}

