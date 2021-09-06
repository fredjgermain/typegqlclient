import React, { useState, useContext, useEffect } from 'react'; 


// --------------------------------------------------------------------
import { client } from '../../apolloclient'; 
import { ColContext, Cols, RowContext, Rows, Table, TableContext } from '../../libs/components/table/_table'; 
import { Dao } from '../../libs/dao/dao.class'; 
import { ModelDescriptor } from '../../libs/dao/dao.utils'; 
import { FetcherComponent, Busy, Error, FetcherContext } 
  from '../../libs/fetcher/fetcher.components'; 
import { InputSelect } from '../../libs/inputs'; 
import { IsEmpty } from '../../libs/utils';



type TAdminContext = {collectionAccessor:string, SetCollectionAccessor:(accessor:string)=>void} 
export const AdminContext = React.createContext({} as TAdminContext); 
export function AdminPage() { 
  const [collectionAccessor, setCollectionAccessor] = useState(''); 
  function SetCollectionAccessor(accessor:string) { 
    setCollectionAccessor(accessor); 
  } 

  const dao = new Dao(client); 
  const fetchModels = () => dao.fetcher.ModelDescriptors({}); 
  async function fetchCollection() { 
    const [model] = await dao.fetcher.ModelDescriptors({modelsName:[collectionAccessor]}); 
    const entries = await dao.fetcher.Read({modelName:collectionAccessor}); 
    return {model, entries} 
  } 
  
  return <AdminContext.Provider value={{collectionAccessor, SetCollectionAccessor}}> 
    <FetcherComponent {...{fetchAction:fetchModels, Busy, Error}}> 
      <CollectionSelector/> 
      {!IsEmpty(collectionAccessor) && 
        <FetcherComponent {...{fetchAction:fetchCollection, Busy, Error}} key={collectionAccessor}> 
          <AdminTable/>
        </FetcherComponent>
      }
    </FetcherComponent> 
  </AdminContext.Provider>
}


function AdminTable() { 
  const {collectionAccessor} = useContext(AdminContext); 
  const result = useContext(FetcherContext); 
  const {model, entries} = (result ?? {}) as {model:ModelDescriptor, entries:IEntry[]} 
  const rows = entries.map( entry => entry._id ); 
  const cols = model.ifields.map( f => f.accessor ); 

  return <div> 
    <DisplayModel {...{model}} /> 
    <Table {...{Key:collectionAccessor, contextValue:{model, entries}}} > 
      <Rows {...{rows}} > 
        <Cols {...{cols}}><Cell/></Cols> 
      </Rows>
    </Table>
  </div> 
}

function Cell() { 
  const {model, entries} = useContext(TableContext) as {model:ModelDescriptor, entries:IEntry[]} 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 

  const entry = (entries.find( entry => entry._id === row ) ?? {}) as IEntry; 
  
  return <span> 
    {entry[col]} 
  </span> 
}


function DisplayModel({model}:{model:ModelDescriptor}) { 
  if(IsEmpty(model)) 
    return <div></div> 
  return <div> 
    MODEL : {model?.label[0]} <br/> 
    {model?.description[0]} 
  </div> 
}


function CollectionSelector() { 
  const result = useContext(FetcherContext); 
  const { collectionAccessor:value, SetCollectionAccessor } = useContext(AdminContext); 
  function onSetValue(newValue:any) { 
    SetCollectionAccessor(newValue); 
  }

  const bModels = ((result ?? []) as ModelDescriptor[]) 
    .filter( model => ['Patient', 'Form', 'Question', 'Instructions', 'ResponseGroup', 'Answer'].includes(model.accessor) ) 

  const options = bModels.map( model => { 
    return {value:model.accessor, label:model.label[0]} as IOption; 
  }) 

  return <div> 
    <InputSelect {...{value, onSetValue, options, multiple:false}} /> 
  </div> 
}
