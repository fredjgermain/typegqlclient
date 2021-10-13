import React, { useContext } from 'react'; 
import { IsEmpty } from '../../../libs/utils'; 
import { ModelSelectorContext } from '../hooks/usemodelselector.hook'; 



export function CollectionDescription() { 
  const modelselector = useContext(ModelSelectorContext); 
  const { modelData:{model} } = modelselector; 

  if(IsEmpty(model)) 
    return <div></div> 

  return <div> 
    <h4>{model.label}</h4> 
    <p>{model.description}</p> 
  </div>
}
