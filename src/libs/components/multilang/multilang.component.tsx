import React, {useContext, useState} from 'react'; 

// --------------------------------------------------------
import { InputSelect } from '../../inputs'; 


export const LangContext = React.createContext({} as {langlabels:string[][], langindex:number, SetLangindex}); 

export function LangContexter({children, langlabels}: React.PropsWithChildren<{langlabels:string[][]}>) { 
  const [langindex, setLangindex] = useState(0); 
  const SetLangindex = (newLangIndex:number) => setLangindex(newLangIndex); 

  return <LangContext.Provider value={{langlabels, langindex, SetLangindex}} > 
    {children} 
  </LangContext.Provider> 
} 

export function GetLabel(multiLangLabels:string[] ) { 
  const {langindex} = useContext(LangContext); 
  return multiLangLabels[langindex] ?? multiLangLabels[0] ?? ''; 
} 

export function GetLangOptions():IOption[] { 
  const {langlabels} = useContext(LangContext); 
  return langlabels.map( (langlabel:string[], i:number) => { 
    return { value: i, label: GetLabel(langlabel) } 
  }) 
} 


export function MultiLangSelector() { 
  const {langindex, SetLangindex} = useContext(LangContext); 
  const options = GetLangOptions(); 
  return <InputSelect {...{value:langindex, onSetValue:SetLangindex, options}} /> 
} 