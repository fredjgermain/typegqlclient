import React from 'react';



// -------------------------------------------------------- 
import { useCrud } from './hooks/crudcollection.hooks'; 
import { CrudCollectionTable } from './components/table.component'; 
import { CollectionDescription } from './components/collectiondescription.component';
import { CrudEntryEditor } from './components/crudentryeditor.component';
import { IsEmpty } from '../utils';



// --------------------------------------------------------
export const CrudCollectionContext = React.createContext({} as ReturnType<typeof useCrud>); 
export function CrudCollection({modelName}:{modelName:string}) { 
  const usecrudcontext = useCrud({modelName}) 

  /*if(usecrudcontext.crudStatus.busy) 
    return <div>busy</div> */

  // if(IsEmpty( usecrudcontext.data.entries)) 
  //   return <div>no data</div> 

  console.log(usecrudcontext.crudStatus.ready); 
  if(!usecrudcontext.crudStatus.ready) { 
    console.log(usecrudcontext.data.entries); 
    return <div>Not ready yet</div> 
  }
    

  return <CrudCollectionContext.Provider value={usecrudcontext} > 
    <div> 
      <CollectionDescription /> 
      <CrudEntryEditor /> 
      <CrudCollectionTable /> 
    </div> 
  </CrudCollectionContext.Provider> 
} 