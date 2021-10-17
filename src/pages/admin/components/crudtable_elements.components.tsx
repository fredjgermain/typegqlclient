import { useContext } from 'react'; 


// -------------------------------------------------------------------- 
import { EnumCrud } from '../../../libs/dao/dao.class'; 
import { FieldReader } from '../../../libs/entryreadereditor/fieldreader.component';


import { THeadContext, RowContext, ColContext } 
  from '../../../libs/table/_table'; 
import { Capitalize, Label } from '../../../libs/utils'; 
import { CrudEntryContext } from '../../../libs/crudentry';



export function BtnSelectEntry() { 
  const {crudEntry:{entries, defaultEntry}, SelectEntry} = useContext(CrudEntryContext); 
  const {row} = useContext(RowContext); 
  const entry = entries.find( e => e._id === row ) ?? defaultEntry; 

  function Select(action:EnumCrud) { 
    SelectEntry({entry, action}) 
  } 
  
  return <span> 
    <button onClick={() => Select(EnumCrud.Update)}>Update</button> 
    <button onClick={() => Select(EnumCrud.Delete)}>Delete</button> 
  </span> 
} 



export function Head() { 
  const { crudEntry:{model} } = useContext(CrudEntryContext); 
  const {col} = useContext(THeadContext); 
  
  const ifield = model.ifields.find( f => f.accessor === col) ?? {} as IField; 
  const label = Label(ifield); 
  return <span>{Capitalize(label)}</span> 
} 



export function Cell() { 
  const { crudEntry:{model, entries, ifieldsOptions} } = useContext(CrudEntryContext); 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const entry = (entries.find( entry => entry._id === row ) ?? {}) as IEntry; 
  const ifield = model.ifields.find( f => f.accessor === col) ?? {} as IField; 
  const options = ifieldsOptions[ifield.accessor]; 

  return <FieldReader {...{entry, ifield, options}} /> 
} 


