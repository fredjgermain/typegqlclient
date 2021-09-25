

// -------------------------------------------------------- 
import { FieldEditor } from './fieldeditor.component'; 

// !!! ENTRY MUST NOT BE UNDEFINED OR NULL  !!!


export function EntryEditor({entry, SetEntry, ifieldsOptions, ifields}:{ 
    entry:IEntry, 
    SetEntry:(newEntry:IEntry)=>void, 
    ifieldsOptions: {[key:string]:IOption[]}, 
    ifields:IField[] 
  }) { 
  return <div> 
      {ifields.map( ifield => { 
        const options = ifieldsOptions[ifield.accessor] ?? [] as IOption[]; 
        const fieldArgs = {entry, SetEntry, ifield, options} 
        return <FieldEditor key={ifield.accessor} {...fieldArgs} /> 
      })} 
    </div> 
} 