import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 


// -------------------------------------------------------- 
import { InputSelect } from '../inputs/inputselect/inputselect'; 


type IInputSelect = React.ComponentProps<typeof InputSelect>; 
function TestInput(props:IInputSelect) { 
  const [value, setValue] = useState(props.value); 
  const SetValue = (newValue:any[]) => setValue(newValue); 
  const args = {...props, value, SetValue}

  return <div> 
    {JSON.stringify(value)} <br/> 
    <InputSelect {...args} /> 
  </div> 
} 


export default { 
  title: 'Input/InputSelect', 
  component: TestInput, 
} 

const Template:Story<IInputSelect> = args => <TestInput {...args} /> 


const optionsObj = [ 
  {label:'option 0', value:{_id:0}}, 
  {label:'option 1', value:{_id:1}}, 
  {label:'option 2', value:{_id:2}}, 
  {label:'option 3', value:{_id:3}} 
] as IOption[]; 

const optionsString = [ 
  {label:'option 0', value:'0'}, 
  {label:'option 1', value:'1'}, 
  {label:'option 2', value:'2'}, 
  {label:'option 3', value:'3'} 
] as IOption[]; 


export const TestInput_singlestringValue = Template.bind({}) 
TestInput_singlestringValue.args = { 
  value:undefined, 
  options:optionsString, 
} 

export const TestInput_multiplestringValue = Template.bind({}) 
TestInput_multiplestringValue.args = { 
  value:[], 
  options:optionsString, 
  multiple:true, 
} 

export const TestInput_singleObject = Template.bind({}) 
TestInput_singleObject.args = { 
  value:undefined, 
  options:optionsObj, 
  multiple:false, 
} 

export const TestInput_multipleObject = Template.bind({}) 
TestInput_multipleObject.args = { 
  value:[], 
  options:optionsObj, 
  multiple:true, 
} 
