import React from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
import { DeepCopy } from '../../value_type.utils'; 


function Tester({source}:{source:any}) { 
  const deepCopy = DeepCopy(source); 
  console.log(deepCopy); 
  return <div> 
    {JSON.stringify(deepCopy)} 
    {JSON.stringify( deepCopy === source ) } 
  </div> 
}

export default { 
  title: 'Utils/DeepCopy', 
  component: Tester, 
} 

const Template:Story<{source:any}> = args => <Tester {...args} /> 

export const ScalarNumberDeepCopy = Template.bind({}); 
ScalarNumberDeepCopy.args = {
  source: 12
}; 

export const ArrayNumberDeepCopy = Template.bind({}); 
ArrayNumberDeepCopy.args = {
  source: [1,2,3,5,8]
}; 

export const ObjectNumberDeepCopy = Template.bind({}); 
ObjectNumberDeepCopy.args = {
  source: {a:1, b:12}
}; 
