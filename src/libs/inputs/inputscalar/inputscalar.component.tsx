// --------------------------------------------------------
import { useInputScalar } from './inputscalar.hook'; 
import { IInput } from '../input.types'; 
/** Input 
 * Accepts most input types 
 * @param param0 
 * @returns 
 */
export function InputScalar({...props}:IInput) { 
  const {inputAttribute, ...args} = useInputScalar(props); 
  
  if(inputAttribute.type ==='checkbox') 
    return <input {...inputAttribute} {...{checked:args.value} }  /> 
  return <input {...inputAttribute} /> 
}
