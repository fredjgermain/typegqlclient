import React from 'react'; 
import { useInputSelect, InputSelectContext } from '../inputselect.hook'; 
import { Options, OptionGroup } from './option.component'; 
import { DisplaySelection, Selection } from './selection.component'; 

import '../inputselect.css'; 

/* 
U+2335 COUNTERSINK wide 'v' ?? 
*/ 


export function InputSelect({children, ...props}:React.PropsWithChildren<(Parameters<typeof useInputSelect>[0])>) { 

  const context = useInputSelect(props); 
  const className = 'select-main'; 

  if(children) 
    return <InputSelectContext.Provider value={context}> 
        <div {...{...context.toggleAttribute, className}} >{children}</div> 
    </InputSelectContext.Provider> 

  const defaultOptions = props.multiple ? 
    <Options> 
      <OptionGroup options={true} /><hr/><OptionGroup options={false} />
    </Options>: 
    <Options>
      <OptionGroup options={true} /><OptionGroup options={false}/>
    </Options>

  return <InputSelectContext.Provider value={context}> 
    <div {...{...context.toggleAttribute, className}}> 
      <Selection><DisplaySelection/></Selection> 
      {defaultOptions} 
    </div> 
  </InputSelectContext.Provider> 
} 


