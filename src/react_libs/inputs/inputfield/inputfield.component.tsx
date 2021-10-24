import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import { InputArray } from "../inputarray/inputarray.component"; 
import { InputScalar } from "../inputscalar/inputscalar.component"; 
import { InputSelect } from "../inputselect/inputselect"; 
import { IsEmpty, FieldValidation } from "../../../utils/utils"; 
import { DisplayArray, DisplayScalar } from '../display/display.component';

import style from '../../../css/main.module.css'; 

type TInputField = { 
  value:any, 
  SetValue?:(newValue:any) => void, 
  ifield:IField, 
  options?:IOption[] 
} 


export const FieldContext = React.createContext({} as Required<TInputField>); 
export function FieldContexter ( { children, 
    value, SetValue = (newValue:any) => {}, 
    ifield, options = [], }:React.PropsWithChildren<TInputField>) { 

  return <FieldContext.Provider value={{value, SetValue, ifield, options}}> 
    {children} 
  </FieldContext.Provider> 
} 


export function DisplayFieldValue() { 
  const {value, ifield, options} = useContext(FieldContext); 
  return ifield.type.isArray ? <DisplayArray {...{values:value, options}} /> : 
    <DisplayScalar {...{value, options}} /> 
}


export function InputFieldValue() { 
  const {value, SetValue, ifield, options} = useContext(FieldContext); 
  const valueType = ifield.type.name; 

  return !IsEmpty(options) ? <InputSelect {...{value, SetValue, options, multiple:ifield.type.isArray}} /> : 
    ifield.type.isArray ? <InputArray {...{values:value, SetValues:SetValue, valueType}} /> : 
      <InputScalar {...{value, SetValue, valueType}} /> 
}


export function FieldLabel() { 
  const {ifield} = useContext(FieldContext); 
  const label = `${ifield.label ?? ifield.accessor}`; 
  return <span>{label}</span> 
} 


export function FieldAnnotations() { 
  const {ifield} = useContext(FieldContext); 
  const {required, unique} = (ifield.options ?? {}) as IFieldOption; 
  const requiredAnnotation = required ? '*': ''; 
  const uniqueAnnotation = unique ? '!': ''; 
  return <span>{`${requiredAnnotation} ${uniqueAnnotation}`}</span> 
} 


export function FieldCheck() { 
  const {value, ifield} = useContext(FieldContext); 
  const valid = FieldValidation(value, ifield);
  if(valid) 
    return <span className={style.success}>{'✔'}</span> 
  return <span className={style.error}>{'✖'}</span> 
} 