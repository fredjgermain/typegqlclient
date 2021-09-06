import React, { useContext } from 'react'; 

// --------------------------------------------------------------
import { client } from '../apolloclient'; 
import { Dao } from '../libs/dao/dao.class';



/* 
from useContext: id model columns 
*/ 
const ColumnsContext = React.createContext([] as string[]); 
const RowContext = React.createContext('' as string); 
const ModelContext = React.createContext({} as IModel); 

export function EntryReader() { 
  const columns = useContext(ColumnsContext); 
  const entry = {} as any; 

  return <div> 
    {columns.map( col => { 
      return <span key={col}> [ {entry[col]} ] </span> 
    })} 
  </div> 
} 



export function CollectionReader() { 

}