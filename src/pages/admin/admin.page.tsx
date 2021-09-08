import React, { useState } from 'react'; 



// --------------------------------------------------------------------
import { client } from '../../libs/dao/apolloclient'; 
import { Dao } from '../../libs/dao/dao.class'; 
import { ModelDescriptor } from '../../libs/dao/dao.utils';
import { FetcherComponent, Busy, Error } 
  from '../../libs/fetcher/fetcher.components'; 
import { IsEmpty } from '../../libs/utils'; 
import { AdminTable } from './component/admin.table'; 
import { CollectionSelector } from './component/collectionselector.component'; 



type TAdminContext = { 
  collectionAccessor:string, 
  SetCollectionAccessor:(accessor:string)=>void, 
} 
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
    const introspection = await dao.fetcher.TypeIntrospection(collectionAccessor); 

    const options = [] as IOption[] // = await dao.fetcher.GetOptionsFromIFields(model.ifields); 
    //console.log(options); 

    return {model, entries, introspection, options} //, options}; 
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
// <AdminTable/>
