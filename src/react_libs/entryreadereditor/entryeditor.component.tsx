

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
        const label = `${ifield.label[0] ?? ifield.accessor} : `; 
        const options = ifieldsOptions[ifield.accessor] ?? [] as IOption[]; 
        const fieldArgs = {entry, SetEntry, ifield, options} 
        return <div key={ifield.accessor}> 
          {label} <FieldAnnotations {...{ifield}} /> <FieldEditor {...fieldArgs} /> 
        </div>
      })} 
    </div> 
} 


function FieldAnnotations({ifield}:{ifield:IField}) { 
  const {required, unique} = (ifield.options ?? {}) as IFieldOption; 
  const requiredAnnotation = required ? '*': ''; 
  const uniqueAnnotation = unique ? '!': ''; 
  return <span>{`${requiredAnnotation} ${uniqueAnnotation}`}</span> 
}