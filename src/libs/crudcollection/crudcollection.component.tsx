import React, { useEffect } from 'react'; 



// -------------------------------------------------------- 
import { useCrudCollection } from './hooks/usecrudcollection.hook'; 
import { CrudCollectionTable } from './components/table.component'; 
import { CollectionDescription } from './components/collectiondescription.component'; 
import { CrudEntryEditor } from './components/crudentryeditor.component'; 
import { CrudFeedback } from './components/feedback.component'; 
import { useModelsFetcher } from './hooks/usecollectionselector.hook'; 
import { InputSelect } from '../inputs';



export const CrudCollectionContext = React.createContext({} as ReturnType<typeof useCrudCollection>); 
export function CrudCollection({modelsName}:{modelsName:string[]}) { 
  const {models} = useModelsFetcher(modelsName); 
  const usecrudcollection = useCrudCollection(); 
  const {data} = usecrudcollection; 

  // preps args for Model selector 
  const options:IOption[] = models.map( model => { return {label:model.accessor, value:model.accessor}} ) 
  function SetSelectedModel(accessor:any) { 
    console.log(accessor); 
    const newModel = models.find( model => model.accessor === accessor); 
    usecrudcollection.SetModel(newModel ?? {} as IModel); 
  } 

  return <CrudCollectionContext.Provider value={usecrudcollection} > 
      <InputSelect {...{value:data.model, SetValue:SetSelectedModel, options }} /> 
      <br/>
      {JSON.stringify(data.defaultEntry)} 
      {JSON.stringify(data.entries?.length)} 
      <div key={data.model.accessor}> 
        <CollectionDescription/> 
        <CrudFeedback/> 
        <CrudEntryEditor/> 
        <CrudCollectionTable /> 
      </div>
  </CrudCollectionContext.Provider> 
} 


