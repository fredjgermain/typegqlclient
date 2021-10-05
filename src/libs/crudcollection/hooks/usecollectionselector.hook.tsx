import { useContext, useState, useEffect } from "react"; 



// --------------------------------------------------------
import { DaoContext } from "../../dao/daocontexter.component"; 
import { useCrudCollection } from "./usecrudcollection.hook";


export function useModelsFetcher(modelsName:string[]) { 
  const {dao} = useContext(DaoContext); 

  const [models, setModels] = useState([] as IModel[]); 
  async function FetchModels(modelsName:string[]) { 
    await dao.ModelDescriptors({modelsName}) 
      .then( models => setModels(models) ); 
  } 

  useEffect(() => { 
    FetchModels(modelsName) 
   }, []); 

  return {models}; 
}