

// -------------------------------------------------------- 
import { FieldReader } from './fieldreader.component'; 



export function EntryReader({entry, ifieldsOptions, ifields}:{ 
    entry:IEntry, 
    ifieldsOptions: {[key:string]:IOption[]}, 
    ifields:IField[] 
  }) { 
  return <div> 
      {ifields.map( ifield => { 
        const options = ifieldsOptions[ifield.accessor] ?? [] as IOption[]; 
        const fieldArgs = {entry, ifield, options} 
        return <FieldReader key={ifield.accessor} {...fieldArgs} /> 
      })} 
    </div> 
} 