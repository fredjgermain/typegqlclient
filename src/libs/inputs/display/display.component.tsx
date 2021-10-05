


// -------------------------------------------------------- 
import { Filter, IsEmpty, Predicate, ReduceToString, StringifyEach } from "../../utils"; 



export function DisplayArray(props:{values:any[], options?:IOption[]}, reducer?:Predicate<any>) { 
  const values = props.values.map( value => { 
    return props.options?.find( o => 
      o .value === value )?.label ?? value} ); 
  
  const [reduced, remainder] = Filter(values, reducer ?? (() => true)); 
  const reducedToString = ReduceToString(reduced); 

  if(IsEmpty(remainder)) 
    return <span>{`[${reducedToString}]`}</span>; 
  return <span>{`[${reducedToString}] + ${remainder.length}]`}</span>; 
} 

export function DisplayRef() { 
  
} 

export function DisplayScalar(props:{value:any[], options?:IOption[]}) {
  const value = props.options?.find( o => 
    o.value === props.value )?.label ?? props.value; 
  return <span>{StringifyEach(value)}</span> 
}
