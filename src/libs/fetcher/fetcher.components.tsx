import React, { useContext, useEffect, useState } from 'react';


// ---------------------------------------------------------
import { useFetcher } from './usefetcher.hook';
import { IsEmpty, IsNull } from '../../libs/utils';


export const FetcherContext = React.createContext( {} as any ); 
type TFetcherComponent = {fetchAction:any, Error?:any, Busy?:any}; 
export function FetcherComponent({children, ...props}:React.PropsWithChildren<TFetcherComponent>) { 
  const {status:{loading, ready, result, error}, Fetch} = useFetcher(); 

  const busyComponent = props?.Busy ? <props.Busy/>: <Busy/> 
  const errorComponent = props?.Error ? <props.Error/>: <Error/> 

  useEffect(() => { 
    Fetch( props.fetchAction ); 
  }, []); 

  if(loading && !ready) 
    return <FetcherContext.Provider value={{}}> 
      {busyComponent} 
    </FetcherContext.Provider> 
  if(ready && (error ?? result)) 
    return <FetcherContext.Provider value={error ?? result}> 
      {IsEmpty(error) ? children : error} 
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
