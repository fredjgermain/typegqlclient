import React, {useContext, useState, useEffect} from 'react'; 

// --------------------------------------------------------
import { IInput } from '../input.types'; 
import { InputScalar } from '../inputscalar/inputscalar.component'; 
import { GetDefaultValueByType, GetTypeByValue, 
  GetValueFromInput, GetInputType, 
  IsNull, DefaultWidth, IEvent } from '../../utils'; 
import { TType, GetTType, GetTTypeFromValue, IsInDomain } from '../../typeclass/type.class';






export interface IUseInputArray extends IInput { 
  ElementArgs:(at?:number) => IInput; 
  Create:(newValue:any) => void; 
  Update:(at:number, newValue:any) => void; 
  Delete:(at:number) => void; 
} 


export interface IInputArray { 
  value: any[]; 
  nested: IInput; 
} 


function useInputArray({...props}:IInputArray) { 
  // complete placeholder definition. 
  const [value, setValue] = useState(props.value ?? []); 

  // ElementArgs 
  function NestedArgs(at?:number):IInput { 
    props.nested.value = value[at??-1]; 
    return {...props, ...nestedProps} 
  } 

  // Creates new elements 
  function Create (newValue:any) { 
    props.onChange && props.onChange([...value, newValue]); 
  }; 
  // Update existing new elements 
  function Update (at:number, newValue:any) { 
    const copy = [...value]; 
    copy[at] = newValue; 
    props.onChange && props.onChange(copy); 
    setValue(copy); 
  }; 
  // Delete existing elements 
  function Delete (at:number) { 
    const copy = [...value]; 
    copy.splice(at,1); 
    props.onChange && props.onChange(copy); 
    setValue(copy); 
  }; 

  return {...props, ElementArgs: NestedArgs, Create, Update, Delete}; 
}



const InputArrayContext = React.createContext({} as IUseInputArray); 
export function InputArray({...props}:IInput) { 
  const context = useInputArray(props); 

  return <InputArrayContext.Provider value={context} > 
    {context.value.map( (e:any,i) => { 
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
  //const [value, setValue] = useState(elementArgs.value); 
  elementArgs.value = value; 
  elementArgs.onSetValue = (newValue:any) => setValue(newValue); 
  elementArgs.onPressTab = () => {} 
  elementArgs.onPressEnter = () => { 
    Create(value); 
    setValue(elementArgs.defaultValue); // reset input to defaultValue after creation. 
  }; 
  
  return <InputScalar {...elementArgs} /> 
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

  return <InputScalar {...elementArgs} /> 
}

// Delete Btn ===================================
function DeleteElement({index}:{index:number}) {
  const {Delete} = useContext(InputArrayContext); 
  return <button onClick={() => Delete(index)} >x</button> 
}


