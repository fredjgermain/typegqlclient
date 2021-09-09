import React, { useState } from 'react'; 



// --------------------------------------------------------------------
import { client } from '../../libs/dao/apolloclient'; 
import { Dao } from '../../libs/dao/dao.class'; 
import { FetcherComponent } 
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
  
  const fetchModels = { 
    fetchFunc: async () => await dao.fetcher.ModelDescriptors({}) 
  }; 

  const fetchCollection = { 
    fetchFunc: async () => { 
      const [model] = await dao.fetcher.ModelDescriptors({modelsName:[collectionAccessor]}); 
      const entries = await dao.fetcher.Read({modelName:collectionAccessor}); 
      const introspection = await dao.fetcher.TypeIntrospection(collectionAccessor); 
      const options = [] as IOption[]; 
      return {model, entries, introspection, options} 
    } 
  } 
  
  return <AdminContext.Provider value={{collectionAccessor, SetCollectionAccessor}}> 
    <FetcherComponent {...{fetchCallBack:fetchModels}}> 
      <CollectionSelector/> 
      {!IsEmpty(collectionAccessor) && 
        <FetcherComponent {...{fetchCallBack:fetchCollection}} key={collectionAccessor}> 
          <AdminTable/> 
        </FetcherComponent>
      }
    </FetcherComponent> 
  </AdminContext.Provider>
}

