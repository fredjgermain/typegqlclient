import React, { useState, useContext } from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
import { 
  Table, 
  Rows, RowContext, 
  Cols, ColContext, ColsContext
} from '../_table'; 

import '../table.css'; 
//import { useFilter, useSorter } from '../../../inputs'; 
import { usePager, PagerBtns, PageOfPages } from '../../pager'; 
import { IsEmpty } from '../../utils'; 


export default { 
  title: 'Table/statictable', 
  component: TemplateComponent, 
} 

const DataContext = React.createContext({} as {data:any[]}); 


function THeadCell() { 
  const {col} = useContext(ColContext); 
  const {cols} = useContext(ColsContext); 
  const label = cols.find( c => c === col ) ?? []; 
  return <span>[{label}]</span> 
} 


/** 
DAO --- map to Apollo client ... 
access from Cell DAO as a context 
*/

function Cell() { 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const {data} = useContext(DataContext); 
  const entry = data.find( item => item._id === row ); 
  const [value, setValue] = useState( !IsEmpty(entry) ? entry[col] : null ); 
  return <span>[{row} {col}] : {value}</span> 
} 

function MockTable({datas, cols}:{datas:any, cols:string[]}) { 
  // Prep table 
  const paging = usePager(datas, 10); 
  const rows = paging.page.map( item => item._id ); 
  console.log(rows); 

  return <div> 
    <DataContext.Provider value={{data:paging.page}} > 
      <Table {...{Key:paging.pageIndex }} > 
        <thead><tr> 
            <Cols {...{cols}} ><THeadCell /></Cols> 
        </tr></thead> 
        <tbody> 
          <Rows {...{rows}}> 
            <Cols {...{cols}} ><Cell /></Cols> 
          </Rows> 
        </tbody> 
      </Table> 
      <PagerBtns {...paging} /> 
    </DataContext.Provider>
  </div> 
} 




function TemplateComponent({datas, cols, defaultItem}:{datas:Item[], cols:string[], defaultItem:Item}) { 
  return <div> 
    <MockTable  {...{datas, cols}} /> 
  </div> 
} 

const Template:Story<{datas:Item[], cols:string[], defaultItem:Item}> = (args) => <TemplateComponent {...args} /> 

interface Item { 
  _id: string; 
  value: string; 
  value2: string; 
}
export const TestTabler = Template.bind({}) 
TestTabler.args = { 
  datas: [ 
    {_id:'1a', value:'asd', value2:'fgsf'}, 
    {_id:'2a', value:'asd', value2:'fgaf'}, 
    {_id:'3a', value:'asd', value2:'fgf'}, 
    {_id:'4a', value:'fg', value2:'fgdff'}, 
    {_id:'5a', value:'h', value2:'fgnf'}, 
    {_id:'6a', value:'asd', value2:'ggf'}, 
    {_id:'7a', value:'j', value2:'fgf'}, 
    {_id:'8a', value:'k', value2:'fhgf'}, 
    {_id:'9b', value:'asd', value2:'fhgf'}, 
    {_id:'10c', value:'ll', value2:'fgf'}, 
    {_id:'11c', value:'aa', value2:'fgf'}, 
    {_id:'c12', value:'asd', value2:'fhgf'}, 
    {_id:'13b', value:'gg', value2:'fgf'}, 
    {_id:'14g', value:'asd', value2:'fhgf'}, 
    {_id:'15f', value:'cc', value2:'fghf'}, 
    {_id:'16f', value:'asd', value2:'h'}, 
    {_id:'17g', value:'g', value2:'fgf'}, 
    {_id:'18h', value:'asd', value2:'fgf'}, 
    {_id:'19j', value:'g', value2:'fgf'}, 
  ] as Item[], 
  cols: ['_id','value', 'value2'], 
  defaultItem: {_id:'', value:'', value2:''}, 
} 
