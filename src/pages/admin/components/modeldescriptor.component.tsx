import React, { useContext } from 'react'; 

// -------------------------------------------------------- 

import { CrudEntryContext } from '../../../libs/crudentry'; 


export function ModelDescriptor() { 
  const {crudEntry:{model:{label, description}}} = useContext(CrudEntryContext); 
  return <div> 
    <p>Collection name:<em>"{label}"</em></p> 
    <p><em>Description:</em>{description}</p> 
  </div> 
} 
