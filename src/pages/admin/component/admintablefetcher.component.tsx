import { useContext } from 'react'; 


// --------------------------------------------------------------------
import { FetcherComponent, } from '../../../libs/fetcher/fetcher.components'; 
import { AdminContext } from '../admin.page'; 
import { AdminTable } from './admintable.component'; 



export function AdminTableFetcher() { 
  const { dao, collectionAccessor } = useContext(AdminContext); 

  const fetchCollection = { 
    fetchFunc: async () => { 
      const [model] = await dao.ModelDescriptors({modelsName:[collectionAccessor]}); 
      const defaultEntry = await dao.GetDefaultEntry(model); 
      const entries = await dao.Read({modelName:collectionAccessor}); 
      const ifieldsOptions = await dao.GetOptionsFromIFields(model.ifields); 
      return {model, entries, defaultEntry, ifieldsOptions} 
    } 
  }
  
  if(!collectionAccessor) 
    return <span> ... </span> 
  return <FetcherComponent {...{fetchCallBack:fetchCollection}} key={collectionAccessor}> 
    <AdminTable/> 
  </FetcherComponent> 
}
