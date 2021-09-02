import React, { useEffect, useState } from 'react'; 
import { ApolloProvider, gql } from "@apollo/client"; 


// --------------------------------------------------------
import { client } from '../libs/apolloclient'; 
import { Dao } from '../libs/dao/dao.class'; 

export function UpdateForm() { 
  const dao = new Dao(client); 
  const [ready, setReady] = useState(false); 
  const [fetch, setFetch] = useState([] as any[]); 

  const inputs = [{fid:'test2', title:['test'], description:['description']}]; 

  function FetchUpdate(toModify:any) { 
    toModify.fid = 'modified fid'; 
    //console.log(toModify); 
    const result = dao.fetcher.Update('Form', 'fid', [toModify]) 
    .then( (res:any) => { 
      //console.log("update", res.items); 
      setReady(true); 
      setFetch(res.items); 
      console.log(client.cache) 
    }) 
    .catch( err => { 
      //console.log("update-error", err.errors); 
      setReady(false); 
      setFetch(err.errors); 
    }) 
  } 

  function FetchRead() { 
    const result = dao.fetcher.Read('Form', '_id title') 
    .then( (res:any) => { 
      const {_id} = res.items[0]; 
      FetchUpdate({_id}); 
    }) 
    .catch( err => { 
      //console.log("fetcher-error", err.errors); 
      setReady(false); 
      setFetch(err.errors); 
    }) 
  } 

  useEffect(() => { FetchRead() }, []); 

  return <div> 
    {ready ? '!!!': '...'} <br/> 
    UPDATE <br/> 
    {ready ? JSON.stringify(fetch): '...'} <br/>
    --------------------------------------
  </div> 
}
