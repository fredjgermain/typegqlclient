import { useState } from "react"; 


/** useColumnsSelector ==================================== 
 * 
 * @param initColSelection 
 * @returns 
 */ 
export function useColumnSelector(ifields:IField[]) { 
  const initColumnSelection = (ifields ?? []) 
    .map( f => f.accessor ) 
    .filter( f => !f.includes('_') ) 
  
  const [colSelection, setColSelection] = useState(initColumnSelection); 
  function SetColSelection(newColSelection?:string[]) { 
    newColSelection ? 
      setColSelection(newColSelection): 
      setColSelection(initColumnSelection); 
  } 
  const options = initColumnSelection.map( col => { return {label:col, value:col } as IOption}) 
  
  return {colSelection, SetColSelection, options} 
} 
