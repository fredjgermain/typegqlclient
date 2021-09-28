import React, { useContext, useEffect } from 'react';



// -------------------------------------------------------- 
import { useCrud } from './hooks/crudcollection.hooks'; 
import { CrudCollectionTable } from './components/table.component'; 
import { CollectionDescription } from './components/collectiondescription.component';
import { CrudEntryEditor } from './components/crudentryeditor.component';
import { DaoContext } from '../dao/daocontexter.component';



// --------------------------------------------------------
export const CrudCollectionContext = React.createContext({} as ReturnType<typeof useCrud>); 
export function CrudCollection({modelName}:{modelName:string}) { 
  const usecrudcontext = useCrud({modelName}) 
  const {dao} = useContext(DaoContext); 

  async function Test() {
    const modelName = 'Form'; 
    //const [model] = await dao.ModelDescriptors({modelsName:[modelName]}) 
    const read0 = await dao.Read({modelName})     

    const inputs = [
      {	_id:'', 
        fid:"from "+ read0.length, 
        title:["title"], 
        description:[""]
      }] as IEntry[]
    const create = await dao.Create({modelName, inputs}) 
  }

  async function Read () { 
    const modelName = 'Form'; 
    const read1 = await dao.Read({modelName}) 
    console.log(read1); 
  }


  useEffect(() => { 
    //usecrudcontext.FetchModelEntries(); 
    Test()
  }, []); 

  if(!usecrudcontext.crud.ready) { 
    return <button onClick={Read} >Read</button>
  } 

  return <CrudCollectionContext.Provider value={usecrudcontext} > 
    <button onClick={Read} >Read</button>

    <div> 
      <CollectionDescription /> 
      <CrudEntryEditor /> 
      <CrudCollectionTable /> 
    </div> 
  </CrudCollectionContext.Provider> 
} 