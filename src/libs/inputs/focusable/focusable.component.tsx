import { IEvent } 
  from '../../utils'; 


/*

ActionAttributes() => { 
  a set of methods attributes 
  - onFocus, onBlur, onChange, onKeyUp 
  
  Return also attribute 'tabIndex:0' if onFocus or onBlur is passed as an argumennt ? 
}
*/

type TActionAttributes = { 
  onFocus?:(event:any) => void, 
  onBlur?:(event:any) => void, 
  onEnter?:(event:any) => void, 
  onChange?:(event:any) => void, 
} 

function ActionAttributes({onChange, onBlur, onFocus, onEnter}:TActionAttributes) { 

  const onKeyUp = (event:any) => { 
    EnterIsPressed(event) && onEnter && onEnter(event) 
  } 

  const actionAttributes = {onChange, onBlur, onFocus, onKeyUp}; 
  return onBlur || onFocus ? {tabIndex:0, ...actionAttributes} : actionAttributes; 
}


const spanActions = {
  onFocus: (event:any) => console.log('focus from span'), 
  onBlur: (event:any) => console.log('blur from span'),
  onEnter: (event:any) => console.log('enter from span'),
  onChange: (event:any) => console.log('change from span'),
}

const inputActions = {
  onFocus: (event:any) => console.log('focus from input'), 
  onBlur: (event:any) => console.log('blur from input'),
  onEnter: (event:any) => console.log('enter from input'),
  onChange: (event:any) => console.log('change from input'),
}



export function Focusable() { 
  return <span {...ActionAttributes(spanActions)} > 
    <input type='text' value='test' {...ActionAttributes(inputActions)} /> 
  </span> 
} 





/** ONPRESS
 * test if a any of the given 'keys' have been pressed. If so then execute 'Func'
 * @param event event object to get key event from. 
 * @param keys keys to test. 
 * @param Func Func to execute when given keys are pressed. 
 */
 export function IsPressed(event:any, keys:string[])  { 
  const {code} = (event as IEvent); 
  return keys.includes(code) 
} 

export const EnterIsPressed = (event:any) => IsPressed(event, ['Enter', 'NumpadEnter']); 