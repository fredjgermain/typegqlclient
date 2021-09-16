import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { OnEnter } from '../../inputs/inputscalar/inputscalar.hook'; 
import { InputScalar } from '../inputscalar/inputscalar.component'; 
import { useInputArray, IUseInputArray } from './inputarray.hook'; 
import { IInput } from '../input.types'; 



const InputArrayContext = React.createContext({} as IUseInputArray); 
export function InputArray(props:IInput) { 
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
    OnEnter(event) && CreateThenReset(); 

  const CreateThenReset = () => { 
    Create(elementArgs.value); 
    elementArgs.SetValue(defaultValue); 
  }

  elementArgs.inputAttribute = {...elementArgs.inputAttribute, 
    onKeyUp: (event) => { OnEnterCreateThenReset(event) }, 
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
    onKeyUp: (event) => { OnEnter(event) && Update(at, elementArgs.value) }, 
    onBlur: () => Update(at, elementArgs.value) 
  }; 
  return <InputScalar {...elementArgs} /> 
}



function DeleteElement({at}:{at:number}) { 
  const {Delete} = useContext(InputArrayContext); 
  return <button onClick={() => Delete(at)} >x</button> 
} 