import { useState } from 'react'; 



export function InputSorter({onSort}:{onSort: (newValue:any) => void}) { 
  const [sorterValue, setSorterValue] = useState(0); 

  const Sort = (newValue:number) => { 
    const value = newValue === sorterValue ? 0 : newValue; 
    setSorterValue(value); 
    onSort(value); 
  } 
  
  if(sorterValue === 1) 
    return <button onClick={() => Sort(-1)}>&#8657;</button> 
  if(sorterValue === -1) 
    return <button onClick={() => Sort(0)}>&#8659;</button> 
  return <button onClick={() => Sort(1)}>&#x21c5;</button> 
} 

