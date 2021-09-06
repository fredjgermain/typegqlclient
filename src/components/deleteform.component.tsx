import React, { useEffect, useState } from 'react'; 
import { ApolloProvider, gql } from "@apollo/client"; 


// --------------------------------------------------------
import { client } from '../apolloclient'; 
import { Dao } from '../libs/dao/dao.class'; 

export function DeleteForm({SetStep}:{SetStep:(step:number)=>void}) { 
  const dao = new Dao(client); 
  const [ready, setReady] = useState(false); 
  const [fetch, setFetch] = useState([] as any[]); 

  const inputs = [{fid:'test2', title:['test'], description:['description']}]; 

  function FetchDelete(toDelete:any) { 
    const result = dao.fetcher.Delete('Form', 'fid', [toDelete]) 
    .then( (res:any) => { 
      //console.log("update", res.items); 
      setReady(true); 
      setFetch(res.items); 
      SetStep(2); 
    }) 
    .catch( err => { 
      //console.log("update-error", err.errors); 
      setReady(false); 
      setFetch(err.errors); 
    }) 
  } 

  function FetchRead() { 
    const result = dao.fetcher.Read('Form', '_id') 
    .then( (res:any) => { 
      const {_id} = res.items[4]; 
      if(!_id) { 
        setReady(true); 
        setFetch([]); 
        return; 
      }
      FetchDelete(_id); 
    }) 
    .catch( err => { 
      //console.log("fetcher-error", err.errors); 
      setReady(false); 
      setFetch(err.errors); 
    }) 
  } 

  useEffect(() => { FetchRead() }, []); 

  console.log('Delete'); 

  return <div> 
    {ready ? '!!!': '...'} <br/> 
    DELETE <br/> 
    {ready ? JSON.stringify(fetch): '...'} <br/>
    --------------------------------------
  </div> 
}
