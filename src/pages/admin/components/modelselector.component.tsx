import { useContext } from 'react';


// -------------------------------------------------------- 
import { InputSelect } from '../../../libs/inputs';
import { IsEmpty } from '../../../libs/utils'; 
import { ModelSelectorContext, useModelSelector } from '../hooks/usemodelselector.hook'; 
import { ModelsFetcherContext } from '../hooks/usemodelsfetcher.hook'; 
import { EntrySelector } from './entrycontexter.component';



export function ModelSelector() { 
  const {models} = useContext(ModelsFetcherContext); 
  const usemodelselector = useModelSelector(models); 
  const {modelData:{model}, SelectModelArgs} = usemodelselector; 

  return <div> 
    <InputSelect {...SelectModelArgs} /> 
    { !IsEmpty(model) && 
      <ModelSelectorContext.Provider key={model.accessor} value={usemodelselector} > 
        <EntrySelector /> 
      </ModelSelectorContext.Provider> 
    } 
  </div> 
} 