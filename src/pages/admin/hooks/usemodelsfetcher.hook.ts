import React, { useContext, useEffect, useState } from "react"; 


// --------------------------------------------------------
import { DaoContext } from "../../dao/daocontexter.component"; 



export const ModelsFetcherContext = React.createContext({} as ReturnType<typeof useModelsFetcher>); 
export function useModelsFetcher(modelsName:string[]) { 
  const {dao} = useContext(DaoContext); 

  const defaultState = [] as IModel[]; 
  const [models, setModels] = useState(defaultState); 

  useEffect(() => { 
    FetchModels(modelsName); 
  }, []) 

  async function FetchModels(modelsName:string[]) { 
    await dao.ModelDescriptors({modelsName}) 
      .then( models => setModels(models) ); 
  } 

  return {models, FetchModels}; 
}