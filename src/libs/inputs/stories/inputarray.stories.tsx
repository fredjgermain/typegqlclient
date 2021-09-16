import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 


// --------------------------------------------------------
import { InputArray } from '../inputarray/inputarray.component';
import { IInput } from '../input.types'; 

function TestInput({...props}:IInput) { 
  const [value, setValues] = useState(props.value); 
  const SetValue = (newValue:any[]) => setValues(newValue); 
  const args = {...props, value, SetValue}

  return <div> 
    {JSON.stringify(value)} <br/> 
    <InputArray {...args} /> 
  </div> 
} 


export default { 
  title: 'Input/InputArray2', 
  component: TestInput, 
} 

const Template:Story<IInput> = args => <TestInput {...args} /> 


export const TestInput_DefaultValueNull = Template.bind({}) 
TestInput_DefaultValueNull.args = { 
  value:['asdasdsa'], 
  //SetValue: (newValue:any[]) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
} 
