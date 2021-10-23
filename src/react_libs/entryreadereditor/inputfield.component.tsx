import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { InputArray } from "../inputs/inputarray/inputarray.component"; 
import { InputScalar } from "../inputs/inputscalar/inputscalar.component"; 
import { InputSelect } from "../inputs/inputselect/inputselect"; 
import { IsEmpty } from "../../utils/utils"; 
import { FieldReader } from "./fieldreader.component";



type TInputField = { 
  value:any, 
  SetValue:(newValue:any) => void, 
  ifield:IField, 
  options?:IOption[] 
}

type TInputFieldContext = (TInputField & {InputComponent:JSX.Element}); 
export const InputFieldContext = React.createContext({} as TInputFieldContext); 
export function InputField ( { value, SetValue, ifield, options = [], 
    children }:React.PropsWithChildren<TInputField>) { 

  const valueType = ifield.type.name; 
  const InputComponent = 
    !IsEmpty(options) ? <InputSelect {...{value, SetValue, options, multiple:ifield.type.isArray}} /> : 
      ifield.type.isArray ? <InputArray {...{values:value, SetValues:SetValue, valueType}} /> : 
        <InputScalar {...{value, SetValue, valueType}} /> 
  
  const inputfieldcontext = {value, SetValue, ifield, options, InputComponent} as TInputFieldContext; 
  return <InputFieldContext.Provider value={inputfieldcontext}> 
    {children} 
  </InputFieldContext.Provider> 
}


export function FieldLabel() { 
  const {ifield} = useContext(InputFieldContext); 
  const label = `${ifield.label[0] ?? ifield.accessor} : `; 

  return <span>{label}</span> 
}

export function FieldAnnotation() { 
  return <span>... see FieldAnnotation in common folder ...</span> 
} 

export function FieldCheck() { 
  
}