import React, { useState, useContext } from 'react'; 
import { Story } from '@storybook/react'; 


// --------------------------------------------------------
// import { 
//   Table, TableContext, 
//   Rows, RowContext, 
//   Cols, ColContext, 
// } from '../_table'; 

// import '../table.css'; 
// //import { useFilter, useSorter } from '../../_inputs'; 
// import { usePager, PagerBtns, PageOfPages } from '../../../pager'; 
// import { IsEmpty } from '../../../utils'; 


// export default { 
//   title: 'Table/crudtable', 
//   component: TemplateComponent, 
// } 


// function THeadCell() { 
//   const {col} = useContext(ColContext); 
//   const {tableContext} = useContext(TableContext); 
//   const label = tableContext?.cols.find( c => c === col ) ?? []; 
  
//   return <span>[{label}]</span> 
// } 


// function Cell() { 
//   const {row} = useContext(RowContext); 
//   const {col} = useContext(ColContext); 
//   const {tableContext:{data}} = useContext(TableContext); 
//   const [value, setValue] = useState( !IsEmpty(data[row]) ? data[row][col] : null ); 
  
//   return <span>[{row} {col}] : {value}</span> 
// } 


// function BtnCell() { 
//   const {row} = useContext(RowContext); 

//   return <td>[{row}, BTN]</td> 
// } 


// function MockTable({datas, cols}:{datas:Item[], cols:string[]}) { 
//   // Prep table 
//   const paging = usePager(datas, 10); 
//   const rows = Object.keys(paging.page); 
//   const _cols = [...cols, 'BTN']; 

//   return <div> 
//     <Table {...{Key:paging.pageIndex, tableContext:{data:paging.page, cols} }} > 
//       <thead><tr> 
//         <Cols {...{cols}} ><THeadCell /></Cols> 
//         <td>BTN</td> 
//       </tr></thead> 
//       <tbody> 
//         <Rows {...{rows}}> 
//           <Cols {...{cols}} ><Cell /></Cols> 
//           <BtnCell/> 
//         </Rows> 
//       </tbody> 
//     </Table> 
//     <PagerBtns {...paging} /> 
//   </div> 
// } 



// function TemplateComponent({datas, cols, defaultItem}:{datas:Item[], cols:string[], defaultItem:Item}) { 
//   return <div> 
//     <MockTable  {...{datas, cols}} /> 
//   </div> 
// } 

// const Template:Story<{datas:Item[], cols:string[], defaultItem:Item}> = (args) => <TemplateComponent {...args} /> 

// interface Item { 
//   _id: string; 
//   value: string; 
//   value2: string; 
// }
// export const TestTabler = Template.bind({}) 
// TestTabler.args = { 
//   datas: [ 
//     {_id:'1a', value:'asd', value2:'fgsf'}, 
//     {_id:'2a', value:'asd', value2:'fgaf'}, 
//     {_id:'3a', value:'asd', value2:'fgf'}, 
//     {_id:'4a', value:'fg', value2:'fgdff'}, 
//     {_id:'5a', value:'h', value2:'fgnf'}, 
//     {_id:'6a', value:'asd', value2:'ggf'}, 
//     {_id:'7a', value:'j', value2:'fgf'}, 
//     {_id:'8a', value:'k', value2:'fhgf'}, 
//     {_id:'9b', value:'asd', value2:'fhgf'}, 
//     {_id:'10c', value:'ll', value2:'fgf'}, 
//     {_id:'11c', value:'aa', value2:'fgf'}, 
//     {_id:'c12', value:'asd', value2:'fhgf'}, 
//     {_id:'13b', value:'gg', value2:'fgf'}, 
//     {_id:'14g', value:'asd', value2:'fhgf'}, 
//     {_id:'15f', value:'cc', value2:'fghf'}, 
//     {_id:'16f', value:'asd', value2:'h'}, 
//     {_id:'17g', value:'g', value2:'fgf'}, 
//     {_id:'18h', value:'asd', value2:'fgf'}, 
//     {_id:'19j', value:'g', value2:'fgf'}, 
//   ] as Item[], 
//   cols: ['_id','value', 'value2'], 
//   defaultItem: {_id:'', value:'', value2:''}, 
// } 
