import React, { useContext, useEffect, useState } from 'react';


// ---------------------------------------------------------
import { useFetcher, TFetchCallBack } from './usefetcher.hook';


export const FetcherContext = React.createContext( {} as any ); 
type TFetcherComponent = {fetchCallBack:TFetchCallBack, Error?:any, Busy?:any}; 

export function FetcherComponent({children, ...props}:React.PropsWithChildren<TFetcherComponent>) { 
  const { state:{busy, success, ready, error, result}, Fetch } = useFetcher(); 
  const busyComponent = props?.Busy ? <props.Busy/>: <Busy/> 
  const errorComponent = props?.Error ? <props.Error/>: <Error/> 

  useEffect(() => { Fetch( props.fetchCallBack ); }, []); 

  if(busy) 
    return <FetcherContext.Provider value={{}}> 
      {busyComponent} 
    </FetcherContext.Provider> 
  if(ready) 
    return <FetcherContext.Provider value={success ? result : error}> 
      {success ? children : error} 
    </FetcherContext.Provider> 
  else 
    return <FetcherContext.Provider value={{}}> 
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
