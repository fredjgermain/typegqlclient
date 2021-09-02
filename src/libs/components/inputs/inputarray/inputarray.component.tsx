import React, {useContext, useState, useEffect} from 'react'; 

// --------------------------------------------------------
import { IInput, Input } from '../input/_input'; 
import { PrepArgs, IUseInputArray } from './inputarray.utils'; 
//import { useInputArray, IUseInputArray } from './inputarray.hook'; 

/*
import { GetDefaultValueByType, GetTypeByValue, IsNull } from '../../../utils/value_type.utils'; 
import { DefaultWidth, IEvent, GetValueFromInput, OnEnter, GetInputType } from '../../../utils/htmlelement.utils';
*/



const InputArrayContext = React.createContext({} as IUseInputArray); 
export function InputArray({...props}:IInput) { 
  const context = PrepArgs(props); 

  return <InputArrayContext.Provider value={context} > 
    {context.value.map( (e,i) => { 
      return <div key={i} > 
        [{i}]: <UpdateElement index={i} /> <DeleteElement index={i}/> 
      </div> 
    })} 
    [+]: <CreateElement/> 
  </InputArrayContext.Provider> 
}


// Create element =======================================
function CreateElement() { 
  const { Create, ElementArgs } = useContext(InputArrayContext); 
  const elementArgs = ElementArgs(); 
  const [value, setValue] = useState(elementArgs.value); 
  elementArgs.value = value; 
  elementArgs.onSetValue = (newValue:any) => setValue(newValue); 
  elementArgs.onPressTab = () => {} 
  elementArgs.onPressEnter = () => { 
    Create(value); 
    setValue(elementArgs.defaultValue); // reset input to defaultValue after creation. 
  }; 
  
  return <Input {...elementArgs} /> 
} 

// Update element =======================================
function UpdateElement({index}:{index:number}) { 
  const { Update, ElementArgs } = useContext(InputArrayContext); 
  const elementArgs = ElementArgs(index); 
  const [value, setValue] = useState(elementArgs.value); 
  elementArgs.value = value; 
  elementArgs.onSetValue = (newValue:any) => setValue(newValue); 
  elementArgs.onPressTab = () => Update(index, value); 
  elementArgs.onPressEnter = () => Update(index, value); 
  
  useEffect(() => { 
    setValue(elementArgs.value); 
  }, [JSON.stringify(elementArgs.value)]); 

  return <Input {...elementArgs} /> 
}

// Delete Btn ===================================
function DeleteElement({index}:{index:number}) {
  const {Delete} = useContext(InputArrayContext); 
  return <button onClick={() => Delete(index)} >x</button> 
}


