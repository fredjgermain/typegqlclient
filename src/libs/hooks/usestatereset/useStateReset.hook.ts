import { useState } from 'react'; 
//import { UpdateValue } from '../_utils'; 

export function useStateReset<T>(initState:T): 
[T, (newValue:T) => void, () => void ] 
{ 
  const [value, setValue] = useState(initState); 
  const SetValue = (newValue:T) => setValue(newValue); 
  /*const Update = (newValue:T) => { 
    setValue( prev => { 
      return Update(prev, newValue); 
    }) 
  }*/ 
  const ResetValue = () => setValue(initState); 

  return [value, SetValue, ResetValue]; 
} 