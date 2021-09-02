import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
//import { InputFilter, useFilter, Input } from '../../../inputs'; 
import { InputSelect, IInputSelect } from './_inputselect'; 


function TestInputSelect({...props}:IInputSelect) { 
  const [value, setValue] = useState(props.value); 
  const onSetValue = (newValue:any[]) => { 
    console.log(newValue); 
    setValue(newValue); 
  }; 
  const options = props.options; 
  //const {matchValues:options, SetFilters} = useFilter(props.options); 

  return <div> 
    {JSON.stringify(value)} <br/> 
    <InputSelect {...{value, onSetValue, options, multiple:props.multiple}}/> 
  </div> 
} 


export default { 
  title: 'Input/InputSelect', 
  component: TestInputSelect, 
} 

const Template:Story<IInputSelect> = args => <TestInputSelect {...args} /> 

export const TestInputSelect_single = Template.bind({}) 
TestInputSelect_single.args = { 
  value:0, 
  options: [ 
    {value:0, label:'option 0'}, 
    {value:1, label:'option 1'}, 
    {value:2, label:'option 2'}, 
    {value:11, label:'option 11'}, 
    {value:12, label:'option 12'}, 
  ], 
  multiple: false, 
  placeholder: 'select one' 
} 


export const TestInputSelect_multi = Template.bind({}) 
TestInputSelect_multi.args = { 
  value:['a'], 
  options: [ 
    {value:'0', label:'op 0'}, 
    {value:'1', label:'op 1'}, 
    {value:'2', label:'op 2'}, 
    {value:'11', label:'op 11'}, 
    {value:'12', label:'op 12'}, 
  ], 
  multiple: true, 
} 
