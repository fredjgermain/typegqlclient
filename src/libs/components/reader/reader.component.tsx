import react, {} from 'react'; 
import { isPropertySignature } from 'typescript';

// -------------------------------------------------------- 

/** 
value 
readerFunc? 
 */
type OuputFunc = (value:any) => JSX.Element; 

export function Output({...props}:{value:any, outputFunc?:OuputFunc}) { 
  props.outputFunc = props.outputFunc ?? DefaultOutputFunc; 
} 

function DefaultOutputFunc(value:any) { 
  return <div>{JSON.stringify(value)}</div> 
} 
