

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

