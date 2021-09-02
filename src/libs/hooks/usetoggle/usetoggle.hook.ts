import {useRef, useState} from 'react';


export interface IUseToggle<T extends HTMLElement> { 
  toggle:boolean, 
  Toggle: (toggle?:boolean) => void, 
  ToggleBtnAction: () => any, 
  toggleTarget:React.RefObject<T>; 
} 
export function useToggle<T extends HTMLElement>(initToggle:boolean, OnToggle?:(toggle:boolean)=>void):IUseToggle<T> { 
  //<T extends HTMLElement>
  const [toggle, setToggle] = useState(initToggle); 
  const toggleTarget = useRef<T>(null); 
  
  const Toggle = (toggle?:boolean) => setToggle((prev:boolean) => { 
    const isToggle = toggle ?? !prev; 
    OnToggle && OnToggle(isToggle); 
    return isToggle; 
  }); 

  const Focus = (toFocus:boolean) => { 
    if(!toggleTarget.current) 
      return; 
    if(toFocus) { 
      toggleTarget.current.hidden = false; 
      toggleTarget.current.focus(); 
      toggleTarget.current.onblur= () => Toggle(true); 
    } 
    else { 
      toggleTarget.current.onblur=() => {}; 
    } 
  } 

  const ToggleClose = { 
    onClick: () => Toggle(), 
    onMouseUp: () => Focus(true) 
  } 

  const ToggleOpen = { 
    onClick: () => Toggle(), 
    onMouseDown: () => Focus(false) 
  } 

  const ToggleBtnAction = () => { 
    return toggle ? ToggleClose: ToggleOpen; 
  } 

  return {toggle, Toggle, ToggleBtnAction, toggleTarget}; 
}

