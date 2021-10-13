import React from "react"; 
import { useCrudEntry, CrudEntryContext } from "./hooks/usecrudentry.hook"; 



export function CrudEntry({model, children}:React.PropsWithChildren<{model:IModel}>) { 
  const crudentrycontext = useCrudEntry(model); 

  return <CrudEntryContext.Provider value={crudentrycontext} > 
    {children} 
  </CrudEntryContext.Provider> 
} 

