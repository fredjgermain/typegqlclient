import { useContext } from 'react'; 


// -------------------------------------------------------------------- 
import { EnumCrud } from '../../../dao/dao.class'; 
import { FieldContexter, DisplayFieldValue } from '../../../react_libs/inputs'; 


import { THeadContext, RowContext, ColContext } 
  from '../../../react_libs/table'; 
import { Capitalize, Label } from '../../../utils/utils'; 
import { CrudEntryContext } from '../../../react_libs/crudentry';



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
  const ifield = model.ifields.find( f => f.accessor === col) ?? {} as IField; 
  const entry = (entries.find( entry => entry._id === row ) ?? {})!; 
  const value = ((entry ?? {}) as any)[ifield.accessor]; 
  const options = ifieldsOptions[ifield.accessor]; 

  return <FieldContexter {...{value, ifield, options}} > 
    <DisplayFieldValue/> 
  </FieldContexter> 
} 


