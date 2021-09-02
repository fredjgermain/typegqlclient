import React from 'react'; 

// IEvent #####################################
export interface IEvent extends React.ChangeEvent<HTMLInputElement> { 
  code?:any, 
  [key:string]:any, 
} 


/** ONPRESS
 * test if a any of the given 'keys' have been pressed. If so then execute 'Func'
 * @param event event object to get key event from. 
 * @param keys keys to test. 
 * @param Func Func to execute when given keys are pressed. 
 */
export function OnPress(event:any, keys:string[], Func:()=>void)  { 
  const {code} = (event as IEvent); 
  if(keys.includes(code)) 
    Func(); 
} 

export function OnEnterOrTab(event:any, Func:()=>void = ()=>{}) { 
  OnPress(event, ['Enter', 'NumpadEnter', 'Tab'], Func); 
} 

export function OnEnter(event:any, Func:()=>void = ()=>{}) { 
  OnPress(event, ['Enter', 'NumpadEnter'], Func); 
} 

export function OnTab(event:any, Func:()=>void = ()=>{}) { 
  OnPress(event, ['Tab'], Func); 
} 



/** GET VALUE FROM  INPUT 
 * Helps retrieval of value from  input field according to their type. 
 * @param event 
 * @returns a value 
 */
export function GetValueFromInput(event:IEvent) { 
  const target = event.target as any; 
  const type = target.type; 
  if(type === 'number') 
    return target.valueAsNumber as number; 
  if(type === 'date') { 
    return target.value; 
  }
  if(type === 'checkbox') 
    return target.checked as boolean; 
  return target.value; 
} 

/** GET INPUT TYPE 
 * Map a type to acceptable type for an input field.  
 * List of acceptable types;
button, checkbox, color, date, datetime-local, email, image, hidden, number, password, range, reset, tel, text, time, url, week
 * List of excluded types; file
 * @param type 
 * @returns returns an acceptable type for an input field, type 'text' as  default.
 */
export function GetInputType(type:string) { 
  const acceptableTypes = ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'image', 'hidden', 'number', 'password', 'range', 'reset', 'tel', 'text', 'time', 'url', 'week']; 
  
  if(type === 'string') 
    return 'text'; 
  if(type === 'boolean') 
    return 'checkbox'; 
  if(acceptableTypes.includes(type)) 
    return type; 
  return 'text'; 
}


// TAG UTILS ###################################
/*export function SetWidth(value:number):{width:any} { 
  return {width:`${DefaultWidth(value)+2}ch`}; 
} */

export function DefaultWidth(value:any, type:string):number { 
  if(type === 'checkbox') 
    return 2; 
  if(type === 'date') 
    return 17; 
  const w = String(value).length; 
  return w < 4 ? 4 : w; 
} 

