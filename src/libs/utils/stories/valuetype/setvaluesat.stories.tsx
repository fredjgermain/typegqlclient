import React from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
import { SetValuesAt } from '../../value_type.utils'; 


function Tester({source, mods}:{source:any, mods:any}) { 
  const result = SetValuesAt(source, mods); 
  return <div> 
    {JSON.stringify( result ) } 
  </div> 
}

export default { 
  title: 'Utils/SetValuesAt', 
  component: Tester, 
} 

const SetTemplate:Story<{source:any, mods:object}> = args => <Tester {...args} /> 

export const TestSetValuesAtNestedObject = SetTemplate.bind({}); 
TestSetValuesAtNestedObject.args = { 
  source: {a:12, b:{b1:'a', b2:2}}, 
  mods: {a:14, b:{b2:1}} 
}; 
