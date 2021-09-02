import React from 'react'; 
import { Story } from '@storybook/react'; 

// -------------------------------------------------------- 
import { useToggle } from './usetoggle.hook'; 

function TestToggle () { 
  const {toggle, ToggleBtnAction, toggleTarget} = useToggle<HTMLDivElement>(true); 
  return <div> 
    <button {...ToggleBtnAction()} >{toggle ? 'On': 'Off'}</button> 
    <div tabIndex={0} ref={toggleTarget} hidden={toggle}> 
      Open
    </div> 
  </div> 
} 

export default { 
  title: 'Toggle/Toggle', 
  component: TestToggle, 
} 

const Template:Story<any> = args => <TestToggle {...args} /> 


export const TestToggle_ = Template.bind({}) 
  TestToggle_.args = {} 
