import React, { useContext, useEffect } from 'react';



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




// async function Test() {
//   const modelName = 'Form'; 
//   const [model] = await dao.ModelDescriptors({modelsName:[modelName]}) 
//   const readbefore = await dao.Read({modelName}) 
//   console.log(readbefore); 

//   const newEntry = [
//     {	_id:'', 
//       fid:"from "+ readbefore.length, 
//       title:["title"], 
//       description:[""]
//     }] as IEntry[]
//   const create = await dao.Create({modelName, inputs: newEntry}) 
//   console.log(create); 

//   const modEntry = create[0]; 
//   modEntry.title = ["title mod"]; 

//   const update = await dao.Update({modelName, inputs:[modEntry]}) 
//   console.log(update); 

//   let readafter = await dao.Read({modelName}) 
//   console.log(readafter); 

//   const del = await dao.Delete({modelName, ids:[modEntry._id]}) 
//   console.log(del); 

//   readafter = await dao.Read({modelName}) 
//   console.log(readafter); 
// }

// async function Read () { 
//   const modelName = 'Form'; 
//   const read1 = await dao.Read({modelName}) 
//   console.log(read1); 
// }
