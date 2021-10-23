import React, { useContext } from 'react'; 
import { IsEmpty, Predicate, Filter } from '../../../../utils/utils'; 
import { InputSelectContext } from '../inputselect.hook'; 

//  tabIndex={0} 
export function Options({children}:React.PropsWithChildren<{}>) { 
  const {toggle} = useContext(InputSelectContext); 
  return <div className={'select-options'} hidden={!toggle}> 
    {children} 
  </div> 
} 

type IOptionGroup = IOption[] | Predicate<IOption> | boolean; 
export function OptionGroup({options}:{options?:IOptionGroup}) { 
  const _options = GetOptions(options); 
  return <div>
    {_options.map( (option, i) => { 
      return <Option key={i} {...{option}} />
    })}
  </div> 
} 


export function Option({option}:{option:IOption}) { 
  const context = useContext(InputSelectContext); 
  const {multiple, IsSelected} = context; 
  const onClick = () => context.SelectValue(option.value); 
  const className = IsSelected(option) ? 'select-option-selected': 'select-option'; 
  const addRemSymbol = <span>{IsSelected(option) ? '-': '+'}</span> 

  return <div {...{onClick, className}}> 
    {multiple && addRemSymbol} {option.label} 
  </div> 
}


function GetOptions(options?:IOptionGroup):IOption[] { 
  const context = useContext(InputSelectContext); 
  const {IsSelected} = context; 
  let _options = context.options; 

  if(IsEmpty(options)) 
    return _options; 
  if(Array.isArray(options)) 
    return _options.filter(option => _options.some( o => o.value === option.value )); 
  if(typeof options === 'boolean') 
    return _options.filter((option) => IsSelected(option) === options); 
  [_options] = Filter(_options, options as Predicate<IOption>); 
  return _options; 
} 
