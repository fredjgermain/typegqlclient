import {useState} from 'react'; 

export function useRange(from:number, to:number):[number, (newIndex:number)=>void] { 
  const [index, setIndex] = useState(from); 

  const min = Math.min(from, to); 
  const max = Math.max(from, to); 

  function SetIndex(newIndex:number) { 
    if(max >= newIndex && min <= newIndex && newIndex !== index) 
      setIndex(newIndex); 
  } 

  return [index, SetIndex]; 
}
