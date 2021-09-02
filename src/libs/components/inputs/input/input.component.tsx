// --------------------------------------------------------
import { IInput, PrepArgs } from './input.utils'; 

/** Input 
 * Accepts most input types 
 * @param param0 
 * @returns 
 */
export function Input({...props}:IInput) { 
  const {width, ...args} = PrepArgs(props); 
  const style = {...props.inputAttribute?.style, ...width}; 
  const inputArgs = {...props.inputAttribute, ...args, style}; 
  
  if(args.type ==='checkbox') 
    return <input {...inputArgs} {...{checked:args.value} }  /> 
  return <input {...inputArgs} /> 
}