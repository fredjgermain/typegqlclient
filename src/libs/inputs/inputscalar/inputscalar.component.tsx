// --------------------------------------------------------
import { InitProps } from './inputscalar.hook'; 
import { IInput } from '../input.types'; 

/** Input 
 * Accepts most input types 
 * @param param0 
 * @returns 
 */
export function InputScalar({inputAttribute = {}, ...props}:IInput) { 
  const initprops = InitProps({inputAttribute, ...props}); 
  
  if(initprops.inputAttribute.type ==='checkbox') 
    return <input {...initprops.inputAttribute} {...{checked:initprops.value} }  /> 
  return <input {...initprops.inputAttribute} /> 
}
