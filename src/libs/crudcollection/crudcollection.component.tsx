// -------------------------------------------------------- 
import { useContext } from 'react';
import { InputSelect } from '../inputs';
import { IsEmpty } from '../utils'; 
import { CrudEntryEditor } from './components/crudentryeditor.component'; 
import { CrudCollectionTable } from './components/table.component'; 
import { EntrySelectorContext, useEntrySelector } from './hooks/useentryselector'; 
import { ModelSelectorContext, useModelSelector } from './hooks/usemodelselector.hook'; 
import { ModelsFetcherContext, useModelsFetcher } from './hooks/usemodelsfetcher.hook'; 



export function ModelFetcher({modelsName}:{modelsName:string[]}) { 
  const usemodelfetcher = useModelsFetcher(modelsName); 

  if(IsEmpty(usemodelfetcher.models)) 
    return <div>Fetching models ...</div> 

  return <ModelsFetcherContext.Provider value={usemodelfetcher} > 
    <ModelSelector /> 
  </ModelsFetcherContext.Provider> 
} 



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

export function EntrySelector () { 
  const {modelData:{defaultEntry}} = useContext(ModelSelectorContext); 
  const useentryselector = useEntrySelector({entry:defaultEntry}); 

  return <EntrySelectorContext.Provider value={useentryselector} > 
    <CrudEntryEditor /> 
    <CrudCollectionTable /> 
  </EntrySelectorContext.Provider> 
}


// export const CrudCollectionContext = React.createContext({} as ReturnType<typeof useCrudCollection>); 
// export function CrudCollection({modelsName}:{modelsName:string[]}) { 
//   const {models} = useModelsFetcher(modelsName); 
//   const usecrudcollection = useCrudCollection(); 
//   const {data} = usecrudcollection; 

//   // preps args for Model selector 
//   const options:IOption[] = models.map( model => { return {label:model.accessor, value:model.accessor}} ) 
//   function SetSelectedModel(accessor:any) { 
//     console.log(accessor); 
//     const newModel = models.find( model => model.accessor === accessor); 
//     usecrudcollection.SetModel(newModel ?? {} as IModel); 
//   } 

//   return <CrudCollectionContext.Provider value={usecrudcollection} > 
//       <InputSelect {...{value:data.model, SetValue:SetSelectedModel, options }} /> 
//       <br/>
//       {JSON.stringify(data.defaultEntry)} 
//       <div key={data.model.accessor}> 
//         <CollectionDescription/> 
//         <CrudFeedback/> 
//         <CrudEntryEditor/> 
//         <CrudCollectionTable /> 
//       </div>
//   </CrudCollectionContext.Provider> 
// } 


