
export interface IInputSelect { 
  value:any; 
  placeholder?:string; 
  onSetValue: (newValues:any[]) => void; 
  options: IOption[]; 
  multiple?: boolean; 
  sizeFunc?: (value:any) => number; 
} 

export interface IUseSelect extends IInputSelect { 
  toggle: boolean; 
  SetToggle: (toggle?:boolean) => void; 
  selection: IOption[]; 
  SelectValue:(newValue:any) => void; 
  IsSelected: (option:IOption) => boolean; 
  //GetSelection: () => IOption[]; 
} 