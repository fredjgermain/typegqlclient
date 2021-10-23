import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { InputArray } from "../inputarray/inputarray.component"; 
import { InputScalar } from "../inputscalar/inputscalar.component"; 
import { InputSelect } from "../inputselect/inputselect"; 
import { IsEmpty, FieldValidation } from "../../../utils/utils"; 



type TInputField = { 
  value:any, 
  SetValue:(newValue:any) => void, 
  ifield:IField, 
  options?:IOption[] 
} 

export const InputFieldContext = React.createContext({} as Required<TInputField>); 
export function InputField ( { children, options = [], ...props}:React.PropsWithChildren<TInputField>) { 
  return <InputFieldContext.Provider value={{...props, options}}> 
    {children} 
  </InputFieldContext.Provider> 
} 



export function FieldValue() { 
  const {value, SetValue, ifield, options} = useContext(InputFieldContext); 
  const valueType = ifield.type.name; 

  return !IsEmpty(options) ? <InputSelect {...{value, SetValue, options, multiple:ifield.type.isArray}} /> : 
    ifield.type.isArray ? <InputArray {...{values:value, SetValues:SetValue, valueType}} /> : 
      <InputScalar {...{value, SetValue, valueType}} /> 
}



export function FieldLabel() { 
  const {ifield} = useContext(InputFieldContext); 
  const label = `${ifield.label ?? ifield.accessor} : `; 
  return <span>{label}</span> 
} 



export function FieldAnnotations() { 
  const {ifield} = useContext(InputFieldContext); 
  const {required, unique} = (ifield.options ?? {}) as IFieldOption; 
  const requiredAnnotation = required ? '*': ''; 
  const uniqueAnnotation = unique ? '!': ''; 
  return <span>{`${requiredAnnotation} ${uniqueAnnotation}`}</span> 
} 



export function FieldCheck() { 
  const {value, ifield} = useContext(InputFieldContext); 
  return <span>{FieldValidation(value, ifield) ? '✔': '✖' }</span> 
} 