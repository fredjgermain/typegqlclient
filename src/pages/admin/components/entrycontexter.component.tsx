import { useContext } from 'react';


// -------------------------------------------------------- 
import { CrudEntryEditor } from './crudentryeditor.component'; 
import { CrudCollectionTable } from './table.component'; 
import { EntrySelectorContext, useEntrySelector } from '../hooks/useentryselector'; 
import { ModelSelectorContext } from '../hooks/usemodelselector.hook'; 



export function EntrySelector () { 
  const {modelData:{defaultEntry}} = useContext(ModelSelectorContext); 
  const useentryselector = useEntrySelector({entry:defaultEntry}); 

  return <EntrySelectorContext.Provider value={useentryselector} > 
    <CrudEntryEditor /> 
    <CrudCollectionTable /> 
  </EntrySelectorContext.Provider> 
}