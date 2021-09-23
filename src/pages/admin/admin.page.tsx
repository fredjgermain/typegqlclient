import React, { useState } from 'react'; 



// --------------------------------------------------------------------
import { client } from '../../libs/dao/apolloclient'; 
import { Dao } from '../../libs/dao/dao.class'; 
import { FetcherComponent } 
  from '../../libs/fetcher/fetcher.components'; 
import { AdminTableFetcher } from './component/admintablefetcher.component'; 
import { CollectionSelector } from './component/collectionselector.component'; 



// Page Hook ..............................................
function useAdminPage() { 
  const dao = new Dao(client); 
  const [collectionAccessor, setCollectionAccessor] = useState(''); 
  function SetCollectionAccessor(accessor:string) { 
    setCollectionAccessor(accessor); 
  } 
  
  const fetchModels = { 
    fetchFunc: async () => await dao.ModelDescriptors({}) 
  }; 

  return {dao, collectionAccessor, SetCollectionAccessor, fetchModels, }; 
}


// Page Component ..............................................
export type TAdminContext = { 
  dao:Dao, 
  collectionAccessor:string, 
  SetCollectionAccessor:(accessor:string)=>void, 
} 
export const AdminContext = React.createContext({} as TAdminContext); 
export function AdminPage() { 
  console.log('AdminPage'); 
  const {dao, collectionAccessor, SetCollectionAccessor, fetchModels} = useAdminPage() 
  
  return <AdminContext.Provider value={{dao, collectionAccessor, SetCollectionAccessor}}> 
    <FetcherComponent {...{fetchCallBack:fetchModels}}> 
      <CollectionSelector/> 
      <AdminTableFetcher/> 
    </FetcherComponent> 
  </AdminContext.Provider>
}

