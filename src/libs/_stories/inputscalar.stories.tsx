import {useState} from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
import { InputScalar, IInputScalar } from '../inputs/inputscalar/inputscalar'; 



function TestInput({...props}:IInputScalar) { 
  const [value, setValue] = useState(props.value); 
  const SetValue = (value:any) => setValue(value); 
  props.value = value; 
  props.SetValue = SetValue; 

  return <div> 
    {JSON.stringify(value)} <br/> 
    <InputScalar {...props} /> 
  </div>
}


export default { 
  title: 'Input/InputScalar', 
  component: TestInput, 
} 

const Template:Story<IInputScalar> = args => <TestInput {...args} /> 


export const TestInput_DefaultValueNull = Template.bind({}) 
TestInput_DefaultValueNull.args = { 
  value:undefined, 
  SetValue: (newValue:any) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
} 


export const TestInput_Date = Template.bind({}) 
TestInput_Date.args = { 
  value: new Date(), 
  SetValue: (newValue:any) => console.log(newValue), 
  valueType: 'date', 
} 

export const TestInput_String_fewArgs = Template.bind({}) 
TestInput_String_fewArgs.args = { 
  value:'a string', 
  SetValue: (newValue:any) => console.log(newValue), 
} 

export const TestInput_String = Template.bind({}) 
TestInput_String.args = { 
  //ttype: 'string', 
  //placeholder: '3 digits', 
  value:'a string', 
  SetValue: (newValue:any) => console.log(newValue), 
  // onChange: (newValue:any) => console.log(newValue), 
  // onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 

export const TestInput_Number = Template.bind({}) 
TestInput_Number.args = { 
  //type: 'number', 
  value: 12, 
  SetValue: (newValue:any) => console.log(newValue), 
  // onChange: (newValue:any) => console.log(newValue), 
  // onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 

export const TestInput_Color = Template.bind({}) 
TestInput_Color.args = { 
  // type: 'color', 
  // inputType: 'color', 
  value: '', 
  SetValue: (newValue:any) => console.log(newValue), 
  inputAttribute: {type:'color'} 
  //onChange: (newValue:any) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
  //_width: , 
} 

export const TestInput_Bool = Template.bind({}) 
TestInput_Bool.args = { 
  // type: 'boolean', 
  value: false, 
  SetValue: (newValue:any) => console.log(newValue), 
  // onChange: (newValue:any) => console.log(newValue), 
  // onPressEnter: () => console.log('on Press Enter'), 
  //sizeFunc: (value:any) => 5, 
  //_width: , 
} 
