import { Story } from '@storybook/react'; 
import { useStateReset } from './useStateReset.hook'; 

export default { 
  title: 'Hooks/useStateReset', 
  component: TemplateComponent, 
} 

function TemplateComponent({initValue, change}:{initValue:any, change:any}) { 
  const [value, SetValue, ResetValue] = useStateReset(initValue); 

  return <div> 
    {JSON.stringify(value)} 
    <button onClick={() => SetValue(change)}>Change</button> 
    <button onClick={ResetValue}>Reset</button> 
  </div> 
} 

const Template:Story<{initValue:any, change:any}> = (args) => <TemplateComponent {...args} /> 

export const InitString = Template.bind({}) 
InitString.args = { 
  initValue:'value', 
  change:'modified' 
} 

export const IniNumber = Template.bind({}) 
IniNumber.args = { 
  initValue:12, 
  change:14, 
} 

export const IniArray = Template.bind({}) 
IniArray.args = { 
  initValue:[12, 5], 
  change:[], 
} 

export const IniObj = Template.bind({}) 
IniObj.args = { 
  initValue:{row:0, mode:'read'}, 
  change:{row:1} 
} 

export const IniObj2 = Template.bind({}) 
IniObj2.args = { 
  initValue:{}, 
  change:{row:1} 
} 
