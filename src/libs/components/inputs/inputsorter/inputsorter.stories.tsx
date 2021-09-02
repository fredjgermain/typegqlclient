import React from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
import { useSorter, InputSorter } from './_inputsorter'; 


// assumes a 1 lvl object like {key1:orderValue, key2:orderValue ... etc}
function TestInput() { 
  const toSort = [ 
    {a:'a', b:1, c: 4}, 
    {a:'a', b:2, c: 3}, 
    {a:'a', b:2, c: 1}, 
    {a:'a', b:1, c: 5}, 

    {a:'b', b:3, c: 4}, 
    {a:'b', b:4, c: 2}, 
    {a:'b', b:3, c: 5}, 
    {a:'b', b:4, c: 3}, 
  ] 

  const {sortedValues, sorter, SetSorter, ResetSorter} = useSorter(toSort); 

  const SortBy = (key:string, sortDirection:any) => { 
    let sorterObj = ({} as any) 
    sorterObj[key] = sortDirection; 
    SetSorter(sorterObj); 
  }; 

  return <div> 
    {JSON.stringify(sorter)} <br/> 
    {sortedValues.map( (value, i) => { 
      return <div key={i}> 
        {i}:{JSON.stringify(value)} 
      </div> 
    })} 
    <button onClick={ResetSorter} >Reset</button> 
    <InputSorter {...{onSort:(sort) => SortBy('a', sort)}} /> 
    <InputSorter {...{onSort:(sort) => SortBy('b', sort)}} /> 
    <InputSorter {...{onSort:(sort) => SortBy('c', sort)}} /> 
  </div> 
} 


export default { 
  title: 'Input/InputSorter', 
  component: TestInput, 
} 

const Template:Story<any> = args => <TestInput {...args} /> 


export const TestInput_DefaultValueNull = Template.bind({}) 
TestInput_DefaultValueNull.args = { 
  onSetValue: (newValue:any) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
} 
