import React, { useContext } from 'react'; 
import { useInputSelect } from '../inputselect.hook'; 
import { IInputSelect, IUseSelect } from '../inputselect.type'; 
import { Options, OptionGroup } from './inputselect.option.component'; 
import { DisplaySelection, Selection } from './inputselect.selection.component'; 

import '../inputselect.css'; 



/*
U+2335 COUNTERSINK wide 'v' ?? 

*/

export const InputSelectContext = React.createContext({} as IUseSelect); 
export function InputSelect({children, ...props}:React.PropsWithChildren<IInputSelect>) { 
  const context = useInputSelect(props); 
  const {toggle, SetToggle} = context; 

  const onClick = () => { 
    if(!toggle) SetToggle() 
  } 
  const onBlur = () => SetToggle(false) 
  const onFocus = () => SetToggle(true) 
  const className = 'select-main'; 

  if(children) 
    return <InputSelectContext.Provider value={context}> 
        <div tabIndex={0} {...{onClick, onBlur, onFocus, className}}>{children}</div> 
    </InputSelectContext.Provider> 

  const defaultOptions = props.multiple ? 
    <Options> 
      <OptionGroup options={true} /><hr/><OptionGroup options={false} />
    </Options>: 
    <Options>
      <OptionGroup options={true} /><OptionGroup options={false}/>
    </Options>

  return <InputSelectContext.Provider value={context}> 
    <div tabIndex={0} {...{onClick, onBlur, onFocus, className}}> 
      <Selection><DisplaySelection/></Selection> 
      {defaultOptions} 
    </div> 
  </InputSelectContext.Provider> 
} 

