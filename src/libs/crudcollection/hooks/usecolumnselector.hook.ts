import { useEffect, useState } from "react"; 


/** useColumnsSelector ==================================== 
 * 
 * @param initColSelection 
 * @returns 
 */ 
export function useColumnSelector(model:IModel) { 
  const initColumnSelection = (model?.ifields ?? [])
    .map( f => f.accessor )
    .filter( f => !f.includes('_') )
  const options = initColumnSelection.map( col => { return {label:col, value:col } as IOption}) 

  const [colSelection, setColSelection] = useState(initColumnSelection); 
  function SetColSelection(newColSelection?:string[]) { 
    newColSelection ? 
      setColSelection(newColSelection): 
      setColSelection(initColumnSelection); 
  } 

  useEffect(() => { 
    setColSelection(initColumnSelection); 
  }, [model.accessor]) 
  
  return {colSelection, SetColSelection, options} 
} 
