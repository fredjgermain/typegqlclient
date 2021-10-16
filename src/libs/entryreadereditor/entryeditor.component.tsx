

// -------------------------------------------------------- 
import { FieldEditor } from './fieldeditor.component'; 

// !!! ENTRY MUST NOT BE UNDEFINED OR NULL  !!!


export function EntryEditor({entry, SetEntry, ifieldsOptions, ifields = []}:{ 
    entry:IEntry, 
    SetEntry:(newEntry:IEntry)=>void, 
    ifieldsOptions: {[key:string]:IOption[]}, 
    ifields:IField[] 
  }) { 
  return <div> 
      {ifields.map( ifield => { 
        console.log(ifield); 
        const label = `${ifield.label[0] ?? ifield.accessor} : `; 
        const options = ifieldsOptions[ifield.accessor] ?? [] as IOption[]; 
        const fieldArgs = {entry, SetEntry, ifield, options} 
        //const annotations = ifield.options.
        return <div key={ifield.accessor}> 
          {label} <FieldEditor {...fieldArgs} /> 
        </div>
      })} 
    </div> 
} 