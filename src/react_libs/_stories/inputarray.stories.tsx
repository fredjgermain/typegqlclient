import {useState} from 'react'; 
import { Story } from '@storybook/react'; 


// -------------------------------------------------------- 
import { InputArray } from '../inputs/inputarray/inputarray'; 
import { DaoContexter } from '../../dao/daocontexter.component'; 



type TInputArray = React.ComponentProps<typeof InputArray> 
function TestInput({...props}:TInputArray) { 
  const [values, setValues] = useState(props.values); 
  const SetValues = (newValue:any[]) => setValues(newValue); 
  const args = {...props, values, SetValues} 

  return <div>
    {JSON.stringify(values)} <br/> 
    <InputArray {...args} /> 
  </div>
} 


export default { 
  title: 'Input/InputArray', 
  component: TestInput, 
} 

const Template:Story<TInputArray> = args => <TestInput {...args} /> 


export const TestInput_DefaultValueNull = Template.bind({}) 
TestInput_DefaultValueNull.args = { 
  values:['asdasdsa'], 
  //SetValue: (newValue:any[]) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
} 
