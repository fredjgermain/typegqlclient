import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 

// -------------------------------------------------------- 
import { EntryEditor, IEntryEditor } from './entryeditor.component'; 

function TestEntryEditor({...props}:IEntryEditor) { 
  return <EntryEditor {...props} /> 
} 

export default { 
  title: 'EntryEditor/EntryEditor', 
  component: TestEntryEditor, 
} 

const Template:Story<IEntryEditor> = args => <TestEntryEditor {...args} /> 


// export const TestEntryEditor_ = Template.bind({}) 
// TestEntryEditor_.args = { 
//   model: { 
//     accessor:'test', 
//     label:[], 
//     description:[], 
//     fields:[ 
//       { 
//         accessor: '_id', 
//         type: { 
//           name: 'string', 
//           defaultValue: '', 
//           isScalar:true, 
//         }, 
//         label: 'Id', 
//       }, 
//       { 
//         accessor: 'value', 
//         type: { 
//           name: 'string', 
//           defaultValue: '', 
//           isScalar:true, 
//         }, 
//         label: 'Value', 
//       },
//       { 
//         accessor: 'readonly', 
//         type: { 
//           name: 'string', 
//           defaultValue: '', 
//           isScalar:true, 
//         }, 
//         label: 'ReadOnly', 
//         options:{editable:false} 
//       }, 
//     ], 
//   }, 
//   entry: {_id:'asdas', readonly:'readonly', value:'gfgf'}, 
//   mode: 'update', 
//   entryOptions: {} 
// } as IEntryEditor
