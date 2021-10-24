import React, { useState } from 'react'; 
import { Story } from '@storybook/react'; 


// -------------------------------------------------------- 
import { FieldContexter, FieldCheck, FieldLabel, InputFieldValue } from '../inputs'; 


type IInputSelect = React.ComponentProps<typeof FieldContexter>; 
function TestInput(props:IInputSelect) { 
  const [value, setValue] = useState(props.value); 
  const SetValue = (newValue:any) => setValue(newValue); 
  const args = {...props, value, SetValue} 

  return <div> 
    {JSON.stringify(value)} <br/> 
    <FieldContexter {...args} > 
      <FieldLabel/> : <InputFieldValue/> <FieldCheck/> 
    </FieldContexter> 
  </div> 
} 


export default { 
  title: 'Input/InputField', 
  component: TestInput, 
} 

const Template:Story<IInputSelect> = args => <TestInput {...args} /> 


const optionsString = [ 
  {label:'option 0', value:'0'}, 
  {label:'option 1', value:'1'}, 
  {label:'option 2', value:'2'}, 
  {label:'option 3', value:'3'} 
] as IOption[]; 


const ifields:IField[] = [ 
  { accessor:'scalarStr', label:'Scalar string', type: {defaultValue:'', name:'string'} }
  , 
  { 
    accessor:'scalarNum', label:'Number number', 
    type: {defaultValue:0, name:'number'}, 
  }, 
  { 
    accessor:'arrayStr', label:'Array string', 
    type: {defaultValue:'', name:'string', isArray:true}, 
  }, 
  { 
    accessor:'enum', label:'Enum single', 
    type: {defaultValue:'', name:'string', enums:['', 'choice1', 'choice2', 'choice3'], isEnum:true}, 
  }, 
  { 
    accessor:'enums', label:'Enum multiple', 
    type: {defaultValue:'', name:'string', enums:['choice1', 'choice2', 'choice3'], isEnum:true, isArray:true}, 
  }, 
]; 


export const TestInput_singlestringValue = Template.bind({}) 
TestInput_singlestringValue.args = { 
  value:undefined, 
  options:[], 
  ifield: { 
    accessor:'scalarStr', 
    label:'Scalar string', 
    type: {defaultValue:'', name:'string'} 
  } 
} 
