import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 


// --------------------------------------------------------
import { Focusable } from '../focusable/focusable.component'; 

function TestActionAttributes() { 
  
  return <div> 
    <Focusable/> 
  </div> 
} 


export default { 
  title: 'Input/ActionAttribute', 
  component: TestActionAttributes, 
} 

const Template:Story<any> = args => <TestActionAttributes {...args} /> 


export const TestInput_DefaultValueNull = Template.bind({}) 
TestInput_DefaultValueNull.args = { 
} 
