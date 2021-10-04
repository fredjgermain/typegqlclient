import React, { useContext } from 'react'; 
import { CrudCollectionContext } from '../crudcollection.component';


export function CollectionDescription() { 
  const crudcollectionContext = useContext(CrudCollectionContext); 
  const { data:{model} } = crudcollectionContext; 

  return <div> 
    <h4>{model.label}</h4> 
    <p>{model.description}</p> 
  </div>
}
