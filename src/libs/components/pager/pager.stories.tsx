import React, {useState} from 'react'; 
import { Story } from '@storybook/react'; 

// -------------------------------------------------------- 
import { PageOfPages, PagerBtns } from './pager.component'; 
import { IPageHook, usePager } from './pager.hook'; 

function TestPager() { 
  const items = [
    '1 asdasdsadsa', 
    '2 asdasdsadsa', 
    '3 asdasdsadsa', 
    '4 asdasdsadsa', 
    '5 asdasdsadsa', 
    '6 asdasdsadsa', 
    '7 asdasdsadsa', 
    '8 asdasdsadsa', 
    '9 asdasdsadsa', 

    '10 asdasdsadsa', 
    '11 asdasdsadsa', 
    '12 asdasdsadsa', 
    '13 asdasdsadsa', 
    '14 asdasdsadsa', 
    '15 asdasdsadsa', 
    '16 asdasdsadsa', 
    '17 asdasdsadsa', 
    '18 asdasdsadsa', 
    '19 asdasdsadsa', 

    '10 asdasdsadsa', 
    '11 asdasdsadsa', 
    '12 asdasdsadsa', 
    '13 asdasdsadsa', 
    '14 asdasdsadsa', 
    '15 asdasdsadsa', 
    '16 asdasdsadsa', 
    '17 asdasdsadsa', 
    '18 asdasdsadsa', 
    '19 asdasdsadsa', 
  ]

  const usepager = usePager(items, 2); 
  const {page, pageIndex, pages, setPageIndex} = usepager; 

  return <div> 
    {page.map( (item,i) => { 
      return <div key={i}>{JSON.stringify(item)}</div> 
    })}
    <PageOfPages {...usepager}/> 
    <PagerBtns {...usepager}/> 
  </div>
}


export default { 
  title: 'Pager/Pager', 
  component: TestPager, 
} 

const Template:Story<any> = args => <TestPager {...args} /> 


export const TestInput_DefaultValueNull = Template.bind({}) 
TestInput_DefaultValueNull.args = { 
} 
