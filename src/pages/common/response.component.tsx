
enum EnumResponseTypeNames { 
  number = "number", 
  string = "string", 
  enums = "enums" 
} 


type TNumber = { 
  typeName: EnumResponseTypeNames.number, 
  defaultValue?: number, 
  inputType?: JSX.Element, 
  format?: string, // units ? 
  min?: number, 
  max?: number, 
  decimals?: number, // numbers of decimals default 0 ? 

  //placeholder?: string, 
} 

type TString = { 
  typeName: EnumResponseTypeNames.string, 
  defaultValue?: string, 
  inputType?: JSX.Element, 
  format?: string, 
  regex?: string, 
  
  // placeholder?: string, 
} 

type TEnums = { 
  typeName: EnumResponseTypeNames.enums, 
  defaultValue?: any, 
  inputType?: JSX.Element, 
  options: IOption[], 
  
  // placeholder?: string, 
} 

type TResponse = TString | TNumber | TEnums; 

export function ResponseElement(responseType:TResponse) { 
  const {typeName} = responseType; 
  if(typeName === EnumResponseTypeNames.string) 
    return <ResponseTypeString {...{responseType}} /> 
  if(typeName === EnumResponseTypeNames.number) 
    return <ResponseTypeNumber {...{responseType}} /> 
  if(typeName === EnumResponseTypeNames.enums) 
    return <ResponseTypeEnums {...{responseType}} /> 
  return <div></div>
}

function ResponseTypeString({responseType}:{responseType:TString}) { 
  
  return <div></div> 
} 

function ResponseTypeNumber({responseType}:{responseType:TNumber}) { 
  return <div></div> 
} 

function ResponseTypeEnums({responseType}:{responseType:TEnums}) { 
  // InputSelect or InputRadio or InputSlider ?? 
  return <div></div> 
} 