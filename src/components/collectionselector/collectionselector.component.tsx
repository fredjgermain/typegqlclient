import { useContext, useState } from 'react';


// ---------------------------------------------------------
import { client } from '../../libs/dao/apolloclient'; 
import { Dao } from '../../libs/dao/dao.class'; 
import { ModelDescriptor } from '../../libs/dao/dao.utils'; 
import { FetcherComponent, Busy, Error, FetcherContext } from '../../libs/fetcher/fetcher.components';

//import { useDao } from '../../libs/dao/usedao.hook'; 
import { InputSelect } from '../../libs/inputs'; 
import { TFetchCallBack } from '../../libs/fetcher/usefetcher.hook'; 



export function FetchModels() { 
  const dao = new Dao(client); 

  const fetchCallBack = { 
    fetchFunc: async () => await dao.ModelDescriptors({subfields:['_id', 'accessor', 'label']}), 
  } as TFetchCallBack; 

  return <div>
    <FetcherComponent {...{fetchCallBack, Busy, Error}}> 
      <CollectionSelector/> 
    </FetcherComponent> 
  </div> 
}



function CollectionSelector() { 
  const result = useContext(FetcherContext); 
  const [value, setValue] = useState(''); 
  function onSetValue(newValue:any) { 
    setValue(newValue); 
  }

  const bModels = ((result ?? []) as ModelDescriptor[]) 
    .filter( model => ['Patient', 'Form', 'Question', 'Instructions', 'ResponseGroup', 'Answer'].includes(model.accessor) ) 

  const options = bModels.map( model => { 
    return {value:model.accessor, label:model.label[0]} as IOption; 
  }) 

  return <div> 
    <InputSelect {...{value, onSetValue, options, multiple:false}} /> 
  </div> 
}


