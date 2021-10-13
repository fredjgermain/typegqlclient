import React, { useState } from "react"; 


// -------------------------------------------------------- 
import { EnumCrud } from "../../dao/dao.class"; 



// SELECT ENTRY ACTION ================================================ 
export const EntrySelectorContext = React.createContext({} as ReturnType<typeof useEntrySelector>) 
export function useEntrySelector({entry, action = EnumCrud.Create}:{entry:IEntry, action?:EnumCrud}) { 

  // State --------------------------------------------------------- 
  type TSelectedEntry = typeof defaultSelectedEntry; 
  const defaultSelectedEntry = { entry, action } 
  
  const [selectedEntry, setSelectedEntry] = useState(defaultSelectedEntry); 
  function SetSelectedEntry(newSelectedEntry:Partial<TSelectedEntry> = defaultSelectedEntry) { 
    setSelectedEntry( prev => { return { ...prev, ...newSelectedEntry} } ) 
  } 

  return {selectedEntry, SetSelectedEntry}; 
} 

