import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import style from '../../../css/main.module.css'; 
import { CrudEntryContext } from '../../../react_libs/crudentry'; 


export function CrudEditor_TitleInstructions() { 
  const {crudEntry:{action}} = useContext(CrudEntryContext); 

  const instructions = { 
    Read: [ 
      'Click the "Create new entry" button to open then entry editor', 
    ], 
    Create: [ 
      '"*" Indicates a fields is required and cannot left empty.', 
      'Click the "Confirm Create" button to create a new entry.',  
    ], 
    Update: [ 
      '"*" Indicates a fields is required and cannot left empty.', 
      'Click the "Confirm Update" button to create a new entry.', 
    ], 
    Delete: [ 
      'Click the "Confirm Delete" button to create a new entry.', 
    ] 
  } 

  return <div> 
    <h3>Entry editor</h3> 
    <ul className={style.instruction}> 
      {instructions[action]?.map( (li, i) => { 
        return <li key={i}>{li}</li> 
      })} 
    </ul> 
  </div> 
}
