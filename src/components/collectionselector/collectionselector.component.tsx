import { useContext, useState } from 'react';


// ---------------------------------------------------------
import { client } from '../../libs/dao/apolloclient'; 
import { Dao } from '../../libs/dao/dao.class'; 
import { ModelDescriptor } from '../../libs/dao/dao.utils'; 
import { FetcherComponent, Busy, Error, FetcherContext } from '../../libs/fetcher/fetcher.components';

//import { useDao } from '../../libs/dao/usedao.hook'; 
import { InputSelect } from '../../libs/inputs'; 
//import { useDao } from '../../libs/dao/hooks/usedao.hook'; 



export function FetchModels() { 
  const dao = new Dao(client); 
  const fetchAction = () => dao.fetcher.ModelDescriptors({subfields:['_id', 'accessor', 'label']}); 

  return <div>
    <FetcherComponent {...{fetchAction, Busy, Error}}> 
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





// export function FetchModels() { 
//   const dao = new Dao(client); 
//   const {status:{ready, result, error}, Fetch} = useFetcher(); 
//   const [value, setValue] = useState(''); 
//   function onSetValue(newValue:any) { 
//     setValue(newValue); 
//   }

//   useEffect(() => { 
//     Fetch( () => dao.fetcher.ModelDescriptors({subfields:['_id', 'accessor', 'label']}) ); 
//   }, []); 

//   const bModels = ((result ?? []) as ModelDescriptor[]) 
//     .filter( model => ['Patient', 'Form', 'Question', 'Instructions', 'ResponseGroup', 'Answer'].includes(model.accessor) ) 

//   const options = bModels.map( model => { 
//     return {value:model.accessor, label:model.label[0]} as IOption; 
//   }) 

//   return <div> 
//     <InputSelect {...{value, onSetValue, options, multiple:false}} /> 
//   </div> 
// }

// export function FetchModelDescriptors() { 
//   //const {status:{ready, result}, fetcher:{ModelDescriptors}} = useDao(client); 
//   console.log('Fetch'); 
//   const dao = new Dao(client); 
//   const argsModelDescriptors = {modelsName:['Formss']}; 
//   const argsRead = {modelName:'Form', ids:['a']}; 
//   const {status:{ready, result, error}, Fetch} = useFetcher(); 

//   async function ToFetch() { 
//     const models = await dao.fetcher.ModelDescriptors(argsModelDescriptors); 
//     console.log(models)
//     const read =  [] as any // await dao.fetcher.Read(argsRead); 
//     return {models, read}; 
//   }; 
  
//   useEffect(() => { Fetch( () => ToFetch() ) }, []); 
  
//   return <div> 
//     {JSON.stringify(error)} 
    
//   </div> 
//   // {JSON.stringify(result)} 
// } 


// export function FetchModelDescriptors2() { 
//   const {status:{ready, result}, fetcher:{Read}} = useDao(client); 

//   //const modelsName = ['Patient', 'Form', 'Instruction', 'ResponseGroup', 'Question', 'Answer']; 
//   const modelName = 'Form'; 
//   useEffect(() => { Read({modelName}) }, []); 
//   console.log('fetch', result); 
  
//   return <div> 
//     {ready && '!!!' && <CollectionSelector/>} 
//   </div> 
// } 



// export function CollectionSelector() { 
//   const {cacher} = useDao(client); 

//   console.log(client.cache) 
  
//   //const modelsName = ['Patient', 'Form', 'Instruction', 'ResponseGroup', 'Question', 'Answer'];
//   const modelsName = undefined; 
//   const models = cacher.ModelDescriptors({modelsName, subfields:['accessor']}); 
//   console.log('selector', models); 

//   return <div> 
//     {JSON.stringify(models)} 
//   </div> 
// } 

