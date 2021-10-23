// --------------------------------------------------------
import { InitProps } from './inputscalar.utils'; 
import { IInputScalar } from './inputscalar.utils'; 

/** Input 
 * Accepts most input types 
 * @param param0 
 * @returns 
 */
export function InputScalar({inputAttribute = {}, ...props}:IInputScalar) { 
  const initprops = InitProps({inputAttribute, ...props}); 
  
  if(initprops.inputAttribute.type ==='checkbox') 
    return <input {...initprops.inputAttribute} {...{checked:initprops.value} }  /> 
  return <input {...initprops.inputAttribute} /> 
}

