// -------------------------------------------------------- 
import { Filter, IsEmpty, PickOptions, Predicate, ReduceToString, StringifyEach } from "../../../utils/utils"; 


/** 
 * values, defaults to [] 
 * options, defaults to [] 
 * reducer, default to () => true ... determines how the array should be reduced if it is too long to be display properly 
 * @param props 
 * @returns 
 */
export function DisplayArray(props:{values:any[], options?:IOption[], reducer?:Predicate<any>}) { 
  const values = !IsEmpty(props.options) ? 
    PickOptions(props.values, props.options ?? []).map(o => o.label): 
    props.values ?? []; 

  const reducer = IsEmpty(props.reducer) ? () => true: props.reducer; 
  
  const [reduced, remainder] = Filter(values, reducer ?? (() => true)); 
  const reducedToString = ReduceToString(reduced); 

  if(IsEmpty(remainder)) 
    return <span>{`[${reducedToString}]`}</span>; 
  return <span>{`[${reducedToString}] + ${remainder.length}]`}</span>; 
} 


/** 
 * value 
 * options, defaults to [] 
 * @param props 
 * @returns 
 */
export function DisplayScalar(props:{value:any[], options?:IOption[]}) {
  const value = !IsEmpty(props.options) ? 
    PickOptions(props.value, props.options ?? []).map(o => o.label).shift(): 
    props.value; 
  return <span>{StringifyEach(value)}</span> 
}



export function DisplayField({entry, ifield, options}:{
  entry:IEntry, 
  ifield:IField, 
  options:IOption[], 
}) { 
const value = entry[ifield.accessor] ?? ifield.type.defaultValue; 

const DisplayComponent = 
  ifield.type.isArray ? <DisplayArray {...{values:value, options}} /> : 
    <DisplayScalar {...{value, options}} /> 

return <span>{DisplayComponent}</span>
} 
