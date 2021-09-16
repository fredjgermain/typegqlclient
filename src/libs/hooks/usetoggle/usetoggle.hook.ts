import { useState } from "react"; 



/** useToggle ============================================= 
 * 
 * 
 * @returns 
 */
export function useToggle() { 
  const [toggle, setToggle] = useState(false); 
  const SetToggle = (toggle?:boolean) => { 
    setToggle( prev => { 
      return toggle ?? !prev; 
    }) 
  } 

  const onClick = () => { 
    if(!toggle) SetToggle() 
  } 
  const onBlur = () => SetToggle(false); 
  const onFocus = () => SetToggle(true); 
  const toggleAttribute = {tabIndex:0, onClick, onBlur, onFocus}; 

  return {toggle, SetToggle, toggleAttribute}; 
}