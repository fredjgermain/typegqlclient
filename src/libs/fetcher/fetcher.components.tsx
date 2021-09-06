import React, { useContext, useEffect, useState } from 'react';


// ---------------------------------------------------------
import { useFetcher } from './usefetcher.hook';
import { IsEmpty, IsNull } from '../../libs/utils';


export const FetcherContext = React.createContext( {} as any ); 
export function FetcherComponent({children, ...prop}:React.PropsWithChildren<{fetchAction:any, Error:any, Busy:any}>) { 
  const {status:{loading, ready, result, error}, Fetch} = useFetcher(); 

  useEffect(() => { 
    Fetch( prop.fetchAction ); 
  }, []); 

  if(loading && !ready) 
    return <FetcherContext.Provider value={{}}> 
      <prop.Busy/> 
    </FetcherContext.Provider>
  
  if(!IsEmpty(error) && !IsNull(prop.Error)) 
    return <FetcherContext.Provider value={error}> 
      <prop.Error/> 
    </FetcherContext.Provider> 
  if(!IsEmpty(result)) 
    return <FetcherContext.Provider value={result}> 
      {children} 
    </FetcherContext.Provider> 
  else 
    return <FetcherContext.Provider value={result}> 
    </FetcherContext.Provider> 
}

export function Success() { 
  const result = useContext(FetcherContext); 
  return <div> Success: <br/> 
    {JSON.stringify(result)} 
  </div>
}

export function Error() { 
  const error = useContext(FetcherContext); 
  console.log('error !!! ', error); 
  return <div> Error: <br/>
    {JSON.stringify(error)} 
  </div>
}

export function Busy() { 
  return <div> Busy: ... </div>
}
