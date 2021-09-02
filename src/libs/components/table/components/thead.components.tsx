import React, { useContext } from 'react'; 
//import { InputFilter, InputSorter, IUseFilter, IUseSorter } from '../../_inputs'; 


export const THeadsContext = React.createContext({} as {cols:string[]}) 
export function THeads({cols, children}:React.PropsWithChildren<{cols:string[]}>) { 
  return <THeadsContext.Provider value={{cols}}> 
    {cols.map(col => { 
      return <THead key={col} col={col}>{children}</THead> 
    })} 
  </THeadsContext.Provider> 
} 

export const THeadContext = React.createContext({} as {col:string}) 
export function THead({col, children}:React.PropsWithChildren<{col:string}>) { 
  return <th><THeadContext.Provider value={{col}}> 
    {children} 
  </THeadContext.Provider></th> 
}


// type IGetHeadArgs = () => { ifield: IField; } 
// export function THeadCell({...props}:{GetHeadArgs:IGetHeadArgs}) { 
//   const {ifield} = props.GetHeadArgs(); 
//   return <span>{ifield.label}</span> 
// } 


// export function THeadFilter({filters}:{filters:IUseFilter<IEntry>}) { 
//   const {col} = useContext(THeadContext); 
//   const keys = [col]; 
//   const type = 'string'; 
//   return <InputFilter {...{keys, type, SetFilters:filters.SetFilters}} /> 
// } 

// export function THeadSorter({sorters}:{sorters:IUseSorter<IEntry>}) { 
//   const {col} = useContext(THeadContext); 
//   const keys = [col]; 
//   const type = 'string'; 
//   return <InputSorter {...{keys, type, SetSorters:sorters.SetSorters}} /> 
// } 
