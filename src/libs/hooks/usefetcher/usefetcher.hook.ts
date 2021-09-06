import { useState } from 'react'; 

export function useFetcher() { 
  type StatusType = { loading?: boolean; ready?: boolean; result?: any; error?: any; } 
  const defaultStatus = {loading:false, ready:false, result:null as any, error:null as any}; 
  const [status, setStatus] = useState(defaultStatus); 


  function SetStatus(_status:StatusType) { 
    setStatus((prev:any) => { return {...prev, ..._status} }) 
  } 


  function ResetFetcher() { 
    SetStatus(defaultStatus); 
  }


  async function Fetch( Action:() => Promise<any> ) { 
    SetStatus( {...defaultStatus, loading:true} ) 
    try{ 
      const result = await Action(); 
      SetStatus({loading:false, ready:true, result}) 
    } catch(error) { 
      SetStatus({loading:false, ready:true, error}) 
    } 
  } 

  return {status, Fetch, ResetFetcher}; 
} 