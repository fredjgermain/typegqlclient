import {useState} from 'react'; 
import { Story } from '@storybook/react'; 


// -------------------------------------------------------- 
import { IInputSelect, InputSelect } from '../inputs/inputselect/inputselect'; 

function TestInput({...props}:IInputSelect) { 
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


const optionsString = [ 
  {label:'option 0', value:'0'}, 
  {label:'option 1', value:'1'}, 
  {label:'option 2', value:'2'}, 
  {label:'option 3', value:'3'} 
] as IOption[]; 


export const TestInput_singlestringValue = Template.bind({}) 
TestInput_singlestringValue.args = { 
  value:['asdasdsa'], 
  options:optionsString, 
} 
