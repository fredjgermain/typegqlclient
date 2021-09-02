import React, {useContext, useState} from 'react'; 

// --------------------------------------------------------
import { GetLabel } from '../../multilang'; 
import { Input, InputArray, InputSelect } from '../../inputs'; 
import { IsNull, Filter } from '../../utils'; 



enum EditorMode { 
  update = 'update', 
  create = 'create', 
} 
export interface IEntryEditor { 
  mode:EditorMode, 
  model:IModel, 
  entryOptions: {[key:string]:IOption[]} 
  entry:any, 
} 
interface IEntryEditorContext extends IEntryEditor{ 
  SetEntry:(newEntry:any) => void, 
} 

const EntryEditorContext = React.createContext({} as IEntryEditorContext); 
export function EntryEditor({...props}:IEntryEditor) { 

  const [entry, setEntry] = useState(props.entry); 
  const SetEntry = (newEntry:any) => setEntry(newEntry); 

  const {model, mode, entryOptions} = props; 
  const { ifields: fields } = model; 
  const label = GetLabel(model.label); 
  const description = GetLabel(model.description); 

  const [[idField], mainFields] = Filter( fields, (f) => f.accessor === '_id' ); 
  const [readOnlyFields, editableFields] = Filter( mainFields, (f) => f.options?.editable === false ); 
  // do not display __v 

  return <div><EntryEditorContext.Provider value={{mode, model, entry, SetEntry, entryOptions}} > 
    <div>Model name: {label}</div> 
    <div>Description: {description}</div> 

    {mode === EditorMode.update && <FieldReader {...{ifield:idField}} />} 

    {mainFields.map( ifield => { 
      return ifield.options?.editable === false ? 
        <FieldReader key={ifield.accessor} {...{ifield}} />:
        <FieldEditor key={ifield.accessor} {...{ifield}} />
    })}    
    </EntryEditorContext.Provider></div> 
} 



export function FieldEditor({ifield}:{ifield:IField}) { 
  // const {entry, SetEntry, entryOptions} = useContext(EntryEditorContext); 

  // const {accessor, type} = ifield; // not multilang ?? 
  // const nestedType = type.isArray && Array.isArray(type.nestedType) ? type.nestedType[0] : undefined; 
  // const label = GetLabel([ifield.label]); // get multilingual label ... 
  
  // const value = entry[accessor]; 
  // const onSetValue = (newValue:any) => { 
  //   let copy = {...entry}; 
  //   copy[accessor] = newValue; 
  //   SetEntry(copy); 
  // } 
  // const options = entryOptions[accessor] ?? []; 

  // let Editor = null; 
  // // As a scalar 
  // if(type.isScalar) 
  //   Editor = <Input {...{value, onSetValue, defaultValue:type.defaultValue, type:type.name}} /> 
  // // Single or Many enums 
  // else if(type.isEnum) 
  //   Editor = <InputSelect {...{value, onSetValue, options, multiple:type.isArray}} /> 
  // // Single or Many ref 
  // else if(type.isObject) 
  //   Editor = <InputSelect {...{value, onSetValue, options, multiple:type.isArray}} /> 
  // // As an array of scalar 
  // else if(type.isArray) 
  //   Editor = <InputArray {...{value, onSetValue, defaultValue:nestedType.defaultValue, type:nestedType.name}} /> 

  // //console.log(Editor); 

  // /*return <div>
  //   <Input {...{value, onSetValue, defaultValue:type.defaultValue, type:type.name}} />
  // </div>*/

  // {label} : {IsNull(Editor) ? JSON.stringify(value): Editor} 

  return <div> 
    
  </div> 
} 


export function FieldReader({ifield}:{ifield:IField}) { 
  const {accessor, label, type} = ifield; // not multilang ?? 
  const {entry} = useContext(EntryEditorContext); 
  const value = entry[accessor]; 

  const formattedValue = JSON.stringify(value); // replaced with real formatted value. 

  // As a scalar 
  // return <ReadScalar ... > 

  // As an array of scalar 
  // return <ReadArray ... > 

  // As an array of ref 
  // return <ReadSelect ... > 

  return <div> 
    {label} : {formattedValue} 
  </div> 
} 
