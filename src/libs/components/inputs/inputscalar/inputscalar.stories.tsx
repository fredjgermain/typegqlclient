import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
import { IInputScalar, InputScalar } from './inputscalar.component'; 


function TestInput({...props}:IInputScalar) { 
  const [value, setValue] = useState(props.value); 
  props.value = value; 
  props.onPressEnter = (newValue:any) => setValue(newValue); 
  props.onPressTab = props.onPressEnter; 

  return <div> 
    {JSON.stringify(value)} <br/> 
    <InputScalar {...props} /> 
  </div>
}


// export default { 
//   title: 'Input/InputScalar', 
//   component: TestInput, 
// } 

const Template:Story<IInputScalar> = args => <TestInput {...args} /> 


export const TestInput_DefaultValueNull = Template.bind({}) 
TestInput_DefaultValueNull.args = { 
  onChange: (newValue:any) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
} 

export const TestInput_String_fewArgs = Template.bind({}) 
TestInput_String_fewArgs.args = { 
  value:'a string', 
  onChange: (newValue:any) => console.log(newValue), 
} 

export const TestInput_String = Template.bind({}) 
TestInput_String.args = { 
  type: 'string', 
  value:'a string', 
  placeholder: '3 digits', 
  onChange: (newValue:any) => console.log(newValue), 
  onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 

export const TestInput_Number = Template.bind({}) 
TestInput_Number.args = { 
  type: 'number', 
  value: 12, 
  onChange: (newValue:any) => console.log(newValue), 
  onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 


export const TestInput_Color = Template.bind({}) 
TestInput_Color.args = { 
  type: 'color', 
  //inputType: 'color', 
  value: '', 
  onChange: (newValue:any) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 

export const TestInput_Bool = Template.bind({}) 
TestInput_Bool.args = { 
  type: 'boolean', 
  value: false, 
  onChange: (newValue:any) => console.log(newValue), 
  onPressEnter: () => console.log('on Press Enter'), 
  //sizeFunc: (value:any) => 5, 
  //_width: , 
} 
