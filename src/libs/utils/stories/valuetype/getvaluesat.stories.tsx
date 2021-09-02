import React from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
import { GetValuesAt } from '../../value_type.utils'; 


function Tester({source, indexer}:{source:any, indexer:any}) { 
  const result = GetValuesAt(source, indexer); 
  console.log(result); 
  return <div> 
    {JSON.stringify( result ) } 
  </div> 
}

export default { 
  title: 'Utils/GetValuesAt', 
  component: Tester, 
} 

const GetTemplate:Story<{source:any, indexer:object}> = args => <Tester {...args} /> 

export const TestGetValuesAtNestedObject = GetTemplate.bind({}); 
TestGetValuesAtNestedObject.args = { 
  source: {a:12, b:{b1:'a', b2:2}}, 
  indexer: {a:true, b:{
    b1:true, 
  }} 
}; 

export const TestGetValuesAtArray = GetTemplate.bind({}); 
TestGetValuesAtArray.args = { 
  source: [1,3,6,54,8], 
  indexer: {'1':true, '2':true} 
}; 
