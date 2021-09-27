import { useState } from "react"; 



/** useColumnsSelector ==================================== 
 * 
 * @param initColSelection 
 * @returns 
 */ 
export function useColumnSelector(initColSelection:string[]) { 
  const [colSelection, setColSelection] = useState(initColSelection); 
  function SetColSelection(newColSelection?:string[]) { 
    newColSelection ? 
      setColSelection(newColSelection): 
      setColSelection(initColSelection); 
  } 
  
  return {colSelection, SetColSelection} 
} 
