import React, { useContext } from 'react'; 


// --------------------------------------------------------
import { IsEmpty, ToArray } from '../../../../utils'; 
import { AbbrevArray } from '../../../abbrarray/abbrarray.component'; 
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
  const toAbbrev = ToArray(selection); 

  const [single] = selection; 

  if(context.multiple)
    return <div className={className}> 
      <AbbrevArray {...{toAbbrev, maxLength:13}} />
      {IsEmpty(toAbbrev) && context.placeholder} 
    </div> 
  return <div className={className}> 
    {single ?? context.placeholder} 
  </div> 
} 
