import { useState } from "react";



export function useFetcher() { 
  type TStatus = typeof defaultStatus; 
  const defaultStatus = { 
    busy: false, 
    success: false, 
    results: undefined as any, 
    errors: undefined as any, 
  } 
  
  const [status, setStatus] = useState<TStatus>(defaultStatus); 
  function SetStatus(newStatus:Partial<TStatus>) { 
    const _status = newStatus ?? defaultStatus; 
    setStatus( prev => { return {...prev, ..._status} }) 
  } 

  function Fetch( func:() => Promise<any>, resFunc?:(results:any) => void, errFunc?:(errors:any) => void) { 
    // reset for new fetch 
    SetStatus({...defaultStatus, busy:true}) 

    func() 
      .then( results => { 
        SetStatus({...defaultStatus, results, success:true}) 
        resFunc && resFunc(results); 
      }) 
      .catch( errors => { 
        SetStatus({...defaultStatus, errors, success:false}) 
        errFunc && errFunc(errors); 
      }) 
  } 

  return {status, SetStatus, Fetch} 
} 