// -------------------------------------------------------- 
import { CrudEntryEditor } from './components/crudentryeditor.component'; 
import { CrudCollectionTable } from './components/table.component';
import { useModelSelector, useSelectEntryAction, 
  ModelSelectorContext, SelectEntryActionContext } 
  from './hooks/usecollectionselector.hook'; 



export function CrudCollection({modelsName}:{modelsName:string[]}) { 
  const usemodelselector = useModelSelector(modelsName); 
  const {modelsData:{model, defaultEntry}} = usemodelselector; 
  const useselectentryaction = useSelectEntryAction({entry:defaultEntry}); 

  return <ModelSelectorContext.Provider value={usemodelselector} > 
      <usemodelselector.ModelSelector/> 
      <SelectEntryActionContext.Provider key={model.accessor} value={useselectentryaction} > 
        <CrudEntryEditor /> 
        <CrudCollectionTable /> 
      </SelectEntryActionContext.Provider> 
  </ModelSelectorContext.Provider> 
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


