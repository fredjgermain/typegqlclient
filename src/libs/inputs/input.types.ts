import { TType } from "../typeclass/type.class";

export interface IInput { 
  value: any; 
  sendValue: (newValue:any) => void; 

  ttype?: TType; 
  //sizeFunc?: (value:any) => number; 
  inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 

  /*
  onChange?: (newValue:any) => void; 
  onEnter?: (newValue:any) => void; 
  onTab?: (newValue:any) => void; 
  */ 
} 

// export interface IInput { 
//   type?: string; 
//   value?: any; 
//   defaultValue?: any; 
//   inputType?: string; 

//   placeholder?: string; 

//   onChange: (newValue:any) => void; 
//   onPressEnter?: (newValue:any) => void; 
//   onPressTab?: (newValue:any) => void; 

//   sizeFunc?: (value:any) => number; 
//   inputAttribute?: React.InputHTMLAttributes<HTMLInputElement>; 
// } 

