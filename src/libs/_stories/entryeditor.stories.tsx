import { useState } from 'react'; 
import { Story } from '@storybook/react'; 


// -------------------------------------------------------- 
import { EntryEditor } from '../entryreadereditor/entryeditor.component'; 


type EntryEditParam = Parameters<typeof EntryEditor>[0]; 
function TestEditor(props:EntryEditParam) { 
  const [entry, setEntry] = useState(props.entry); 
  const SetEntry = (newValue:IEntry) => setEntry(newValue); 
  const {ifields, ifieldsOptions} = props; 

  return <div> 
    <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
  </div> 
} 


export default { 
  title: 'Editor/EditEntry', 
  component: TestEditor, 
} 

const Template:Story<EntryEditParam> = args => <TestEditor {...args} /> 


export const TestEditor_Default = Template.bind({}) 
TestEditor_Default.args = { 
  entry: {
    _id:'1', 
    scalarStr:'test', 
    scalarNum:12, 
    arrayStr: ['a', 'bb', 'kk'], 
    enum:'', 
    enums:[], 
  }, 
  ifields: [ 
    { 
      accessor:'scalarStr', label:'Scalar string', 
      type: {defaultValue:'', name:'string'}, 
    }, 
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
  ], 
  ifieldsOptions: { 
    enum:[ 
      {value:'choice1', label:'choice1'}, 
      {value:'choice2', label:'choice2'}, 
      {value:'choice3', label:'choice3'}, 
    ], 
    enums:[ 
      {value:'choice1', label:'choice1'}, 
      {value:'choice2', label:'choice2'}, 
      {value:'choice3', label:'choice3'}, 
    ] 
  } 
  //SetValue: (newValue:any[]) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
} 
