import React, { PropsWithChildren } from 'react'; 
import { 
  ApolloClient, 
  NormalizedCacheObject, 
} from "@apollo/client"; 

// --------------------------------------------------------
import { Dao } from './dao.class'; 


export const DaoContext = React.createContext({} as any); 
export function DaoContexter({children, client}:PropsWithChildren<{client: ApolloClient<NormalizedCacheObject>}>) { 
  const dao = new Dao(client); 

  return <DaoContext.Provider value={dao}> 
    {children} 
  </DaoContext.Provider> 
} 