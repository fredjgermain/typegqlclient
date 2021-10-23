import { useState } from "react";



export function useFetcher() { 
  type TStatus = typeof defaultStatus; 
  const defaultStatus = { 
    busy: false, 
    success: false, 
    results: undefined as any, 
    errors: undefined as any, 
  } 
  
  const [status, setStatus] = useState(defaultStatus); 

  function SetStatus(newStatus:Partial<TStatus> = defaultStatus) { 
    setStatus( prev => { return {...prev, ...newStatus} } ) 
  } 

  function Fetch( fetchFunc:() => Promise<any>, resCallback?:(results:any) => void, errCallback?:(errors:any) => void ) { 
    // reset for new fetch 
    SetStatus({...defaultStatus, busy:true}) 

    fetchFunc() 
      .then( results => { 
        SetStatus({...defaultStatus, results, success:true}) 
        resCallback && resCallback(results); 
      }) 
      .catch( errors => { 
        SetStatus({...defaultStatus, errors, success:false}) 
        errCallback && errCallback(errors); 
      }) 
  } 

  return {status, SetStatus, Fetch} 
} 