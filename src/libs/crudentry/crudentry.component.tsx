import React from "react"; 
import { IsEmpty } from "../utils";
import { useCrudEntry, CrudEntryContext } from "./hooks/usecrudentry.hook"; 



export function CrudEntryContexter({model, children}:React.PropsWithChildren<{model:IModel}>) { 
  const crudentrycontext = useCrudEntry(model); 

  return <CrudEntryContext.Provider value={crudentrycontext} > 
    {!IsEmpty(model) && children} 
  </CrudEntryContext.Provider> 
} 

