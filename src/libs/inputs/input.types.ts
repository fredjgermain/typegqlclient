import { IEvent } from "../utils";



export interface IInput { 
  value: any; 
  SetValue: (newValue:any) => void; 
  defaultValue?: any; 
  valueType?: string; 
  inputAttribute: React.InputHTMLAttributes<HTMLInputElement>; 

  onChange?: (event:IEvent) => void; 
  onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void; 
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; 
} 
