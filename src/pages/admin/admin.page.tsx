import React, { useContext, useState } from 'react'; 



// -------------------------------------------------------------------- 
import { CrudCollection } from '../../libs/crudcollection/crudcollection.component'; 
import { DaoContext } from '../../libs/dao/daocontexter.component';

// Fetch a list of model 
// then SElect a collection 
// then display CrudCollection 

export function AdminPage() { 


  
} 


function useModelFetcher() { 
  const {dao} = useContext(DaoContext); 

  const [models, setModels] = useState([]); 


}


// // Page Hook ..............................................
// function useAdminPage() { 
//   const dao = new Dao(client); 
//   const [collectionAccessor, setCollectionAccessor] = useState(''); 
//   function SetCollectionAccessor(accessor:string) { 
//     setCollectionAccessor(accessor); 
//   } 
  
//   const fetchModels = { 
//     fetchFunc: async () => await dao.ModelDescriptors({}) 
//   }; 

//   return {dao, collectionAccessor, SetCollectionAccessor, fetchModels, }; 
// }


// // Page Component ..............................................
// export type TAdminContext = { 
//   dao:Dao, 
//   collectionAccessor:string, 
//   SetCollectionAccessor:(accessor:string)=>void, 
// } 
// export const AdminContext = React.createContext({} as TAdminContext); 
// export function AdminPage() { 
//   console.log('AdminPage'); 
//   const {dao, collectionAccessor, SetCollectionAccessor, fetchModels} = useAdminPage() 
  
//   return <AdminContext.Provider value={{dao, collectionAccessor, SetCollectionAccessor}}> 
//     <FetcherComponent {...{fetchCallBack:fetchModels}}> 
//       <CollectionSelector/> 
//       <AdminTableFetcher/> 
//     </FetcherComponent> 
//   </AdminContext.Provider>
// }

