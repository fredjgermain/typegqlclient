import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { EnterIsPressed } 
  from '../../react.utils'; 
import { InputScalar } from '../inputscalar/inputscalar.component'; 
import { useInputArray, IInputArray } from './inputarray.hook'; 


type IUseInputArray = ReturnType<typeof useInputArray>; 
const InputArrayContext = React.createContext({} as IUseInputArray); 
export function InputArray({inputAttribute = {},  ...props}:IInputArray) { 
  const context = useInputArray(props); 

  return <InputArrayContext.Provider value={context} > 
    {context.values.map( (e:any,i:number) => { 
      return <div key={i} > 
        [{i}]: <UpdateElement at={i} /> <DeleteElement at={i}/> 
      </div> 
    })} 
    <CreateElement/> 
  </InputArrayContext.Provider> 
} 



function CreateElement() { 
  const { ElementArgs, Create, defaultValue } = useContext(InputArrayContext); 
  const elementArgs = ElementArgs(); 

  const OnEnterCreateThenReset = (event:any) => 
    EnterIsPressed(event) && CreateThenReset(); 

  const CreateThenReset = () => { 
    Create(elementArgs.value); 
    elementArgs.SetValue(defaultValue); 
  }

  elementArgs.inputAttribute = {...elementArgs.inputAttribute, 
    onKeyUp: (event:any) => { OnEnterCreateThenReset(event) }, 
    onBlur: () => {}}; 
  
  return <div> 
    <span onClick={CreateThenReset}>[+]</span>: 
    <InputScalar {...elementArgs} /> 
  </div> 
}



function UpdateElement({at}:{at:number}) { 
  const { ElementArgs, Update } = useContext(InputArrayContext); 
  const elementArgs = ElementArgs(at); 
  elementArgs.inputAttribute = {...elementArgs.inputAttribute, 
    onKeyUp: (event:any) => { EnterIsPressed(event) && Update(at, elementArgs.value) }, 
    onBlur: () => Update(at, elementArgs.value) 
  }; 
  return <InputScalar {...elementArgs} /> 
}



function DeleteElement({at}:{at:number}) { 
  const {Delete} = useContext(InputArrayContext); 
  return <button onClick={() => Delete(at)} >x</button> 
} 