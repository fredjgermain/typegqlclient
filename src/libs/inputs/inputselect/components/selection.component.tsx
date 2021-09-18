import React, { useContext } from 'react'; 


// --------------------------------------------------------
import { Filter, IsEmpty, Predicate, ReduceToString, ToArray } from '../../../utils'; 
import { InputSelectContext } from './inputselect.component'; 



export function Selection({children}:React.PropsWithChildren<{}>) { 
  return <div className={'select-header'}> 
    {children} 
  </div> 
} 


export function DisplaySelection() { 
  const context = useContext(InputSelectContext); 
  const selection = context.selection.map(option => option.label); 
  const className = IsEmpty(context.selection) ? 'select-placeholder': ''; 

  const [single] = selection; 
  const abbrevString = AbbrevSelection(ToArray(selection)); 

  if(context.multiple)
    return <div className={className}> 
      {IsEmpty(abbrevString) ? context.placeholder: JSON.stringify(abbrevString)} 
    </div> 
  return <div className={className}> 
    {single ?? context.placeholder} 
  </div> 
} 


function AbbrevSelection(selection:string[], maxlength:number = 20) { 
  const abbrevPredicate:Predicate<string> = ({positive}) => { 
    const reduced = ReduceToString(positive, ', '); 
    return reduced.length < maxlength; 
  } 
  const [toDisplay, inExcess] = Filter(selection, abbrevPredicate); 
  const reducedToDisplay  = ReduceToString(toDisplay, ', '); 
  if(IsEmpty(inExcess)) 
    return `${reducedToDisplay}`; 
  return `${reducedToDisplay} + ${inExcess.length}`; 
}