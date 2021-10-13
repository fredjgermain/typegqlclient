// -------------------------------------------------------- 
import { IsEmpty } from '../../../libs/utils'; 
import { ModelsFetcherContext, useModelsFetcher } from '../hooks/usemodelsfetcher.hook'; 
import { ModelSelector } from './modelselector.component';


export function ModelFetcher({modelsName}:{modelsName:string[]}) { 
  const usemodelfetcher = useModelsFetcher(modelsName); 

  if(IsEmpty(usemodelfetcher.models)) 
    return <div>Fetching models ...</div> 

  return <ModelsFetcherContext.Provider value={usemodelfetcher} > 
    <ModelSelector /> 
  </ModelsFetcherContext.Provider> 
} 

