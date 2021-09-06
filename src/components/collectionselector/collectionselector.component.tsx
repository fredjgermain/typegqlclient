import React, { useEffect, useState } from 'react';


// ---------------------------------------------------------
import { client } from '../../apolloclient'; 
import { useDao } from '../../libs/dao/usedao.hook';
import { useFetcher } from '../../libs/hooks/usefetcher/usefetcher.hook';
import { IInputSelect } from '../../libs/inputs'; 
//import { useDao } from '../../libs/dao/hooks/usedao.hook'; 

/* 
Fetch all models in a component 

Test if models have been fetched 

Get all models in a component 
Get options from each models 
Display all models options 

*/

export function FetchModelDescriptors() { 
  const {status:{ready, result}, fetcher:{ModelDescriptors}} = useDao(client); 

  const modelsName = ['Patient', 'Form', 'Instruction', 'ResponseGroup', 'Question', 'Answer']; 
  useEffect(() => { ModelDescriptors({modelsName, subfields:['_id']}) }, []); 
  console.log('fetch', result); 
  
  return <div> 
    {ready && '!!!' && <FetchModelDescriptors2/>} 
  </div> 
} 


export function FetchModelDescriptors2() { 
  const {status:{ready, result}, fetcher:{Read}} = useDao(client); 

  //const modelsName = ['Patient', 'Form', 'Instruction', 'ResponseGroup', 'Question', 'Answer']; 
  const modelName = 'Form'; 
  useEffect(() => { Read({modelName}) }, []); 
  console.log('fetch', result); 
  
  return <div> 
    {ready && '!!!' && <CollectionSelector/>} 
  </div> 
} 



export function CollectionSelector() { 
  const {cacher} = useDao(client); 

  console.log(client.cache) 
  
  //const modelsName = ['Patient', 'Form', 'Instruction', 'ResponseGroup', 'Question', 'Answer'];
  const modelsName = undefined; 
  const models = cacher.ModelDescriptors({modelsName, subfields:['accessor']}); 
  console.log('selector', models); 

  return <div> 
    {JSON.stringify(models)} 
  </div> 
} 

