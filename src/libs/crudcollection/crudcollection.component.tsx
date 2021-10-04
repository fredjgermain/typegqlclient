import React, { useEffect } from 'react'; 



// -------------------------------------------------------- 
import { useCrud } from './hooks/usecrud.hook'; 
import { CrudCollectionTable } from './components/table.component'; 
import { CollectionDescription } from './components/collectiondescription.component';
import { CrudEntryEditor } from './components/crudentryeditor.component';
import { IsEmpty } from '../utils';
import { CrudFeedback } from './components/feedback.component';


// --------------------------------------------------------
export const CrudCollectionContext = React.createContext({} as ReturnType<typeof useCrud>); 
export function CrudCollection({modelName}:{modelName:string}) { 
  const usecrudcontext = useCrud({modelName});

  const InitFetch = async () => { 
    await usecrudcontext.FetchModel(); 
    await usecrudcontext.FetchEntries(); 
  }

  useEffect(() => { 
   InitFetch() 
  }, []); 

  if(IsEmpty(usecrudcontext.data.model)) 
    return <div>Loading model ...</div> 

  return <CrudCollectionContext.Provider value={usecrudcontext} > 
    <div>
      <CollectionDescription/> 
      <CrudFeedback/> 
      <CrudEntryEditor/> 
      <CrudCollectionTable /> 
    </div>
  </CrudCollectionContext.Provider> 
} 

