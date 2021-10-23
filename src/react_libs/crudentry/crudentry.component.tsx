import React from "react"; 
import { IsEmpty } from "../../utils/utils";
import { useCrudEntry, CrudEntryContext } from "./hooks/usecrudentry.hook"; 


type TCrudEntryProps = Parameters<typeof useCrudEntry>[0] 
export function CrudEntryContexter({children, ...props}:React.PropsWithChildren<TCrudEntryProps>) { 

  const crudentrycontext = useCrudEntry(props); 

  return <CrudEntryContext.Provider value={crudentrycontext} > 
    {!IsEmpty(props.model) && children} 
  </CrudEntryContext.Provider> 
} 

