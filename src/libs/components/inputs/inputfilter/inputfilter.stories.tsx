import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 

// --------------------------------------------------------
import { InputFilter, useFilter } from './_inputfilter'; 


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

  const {filteredValues, filterObj, SetFilterObj, ResetFilter} = useFilter(toSort); 
  function SetFilters(filters:any) { 
    SetFilterObj({...filterObj, ...filters}) 
  } 

  const filterBy = (strPredicate:string, type:string, key:string) => { 
    let filters = ({} as any) 
    filters[key] = {type, strPredicate}; 
    SetFilterObj({...filterObj, ...filters}) 
  }

  return <div> 
    {Object.keys(filterObj).map( key => { 
      return <span key={key}>{JSON.stringify(filterObj[key])}</span> 
    })} <br/> 
    {filteredValues.map( (value, i) => { 
      return <div key={i}> 
        {i}:{JSON.stringify(value)} 
      </div> 
    })} 
    <button onClick={ResetFilter} >Reset</button> 
    <InputFilter {...{type:'string', onFilter:(strPredicate) => filterBy(strPredicate, 'string', 'a')}} /> 
    <InputFilter {...{type:'number', onFilter:(strPredicate) => filterBy(strPredicate, 'number', 'b')}} /> 
    <InputFilter {...{type:'number', onFilter:(strPredicate) => filterBy(strPredicate, 'number', 'c')}} /> 
  </div> 
} 

/**
 * <button onClick={() => SetFilters({a:(v:any) => v.a === 'a'}) } >Filter by a === 'a'</button> 
    <button onClick={() => SetFilters({b:(v:any) => v.b % 2 === 0})} >Filter by b is even</button> 
 */

export default { 
  title: 'Input/InputFilter', 
  component: TestInput, 
} 

const Template:Story<any> = args => <TestInput {...args} /> 


export const TestInput_DefaultValueNull = Template.bind({}) 
TestInput_DefaultValueNull.args = { 
  //onPressEnter: () => console.log('on Press Enter'), 
} 
