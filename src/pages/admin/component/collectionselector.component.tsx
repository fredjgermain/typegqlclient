import React, { useState, useContext, useEffect } from 'react'; 

// --------------------------------------------------------------------
import { ModelDescriptor } from '../../../libs/dao/dao.utils'; 
import { FetcherContext } 
  from '../../../libs/fetcher/fetcher.components'; 
import { InputSelect } from '../../../libs/inputs/inputselect/inputselect'; 
import { AdminContext } from '../admin.page'; 



export function CollectionSelector() { 
  const { collectionAccessor:value, SetCollectionAccessor } = useContext(AdminContext); 
  const result = useContext(FetcherContext); 
  function SetValue(newValue:any) { 
    SetCollectionAccessor(newValue); 
  } 

  const bModels = ((result ?? []) as ModelDescriptor[]) 
    .filter( model => ['Patient', 'Form', 'Question', 'Instruction', 'ResponseGroup', 'Answer'].includes(model.accessor) ) 

  const options = bModels.map( model => { 
    return {value:model.accessor, label:model.label[0]} as IOption; 
  }) 

  return <div> 
    <InputSelect {...{value, SetValue, options, multiple:false}} />
  </div> 
}
