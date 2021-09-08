import React, { useEffect, useState } from 'react'; 
import { ApolloProvider, gql } from "@apollo/client"; 


// --------------------------------------------------------
import { client } from '../libs/dao/apolloclient'; 
import { Dao } from '../libs/dao/dao.class'; 

export function CreateForm() { 
  const dao = new Dao(client); 
  const [ready, setReady] = useState(false); 
  const [fetch, setFetch] = useState([] as any[]); 

  const inputs = [{fid:'test', title:['test'], description:['description']}]; 

  function Fetch() { 
    dao.fetcher.Create('Form', 'title', inputs) 
    .then( (res:any) => { 
      //console.log("create", res.items); 
      setReady(true); 
      setFetch(res.items); 
    }) 
    .catch( err => { 
      //console.log("create-error", err.errors); 
      setReady(false); 
      setFetch(err.errors); 
    }) 
  } 

  useEffect(() => { Fetch() }, []); 

  return <div> 
    {ready ? '!!!': '...'} <br/> 
    CREATE <br/> 
    {ready ? JSON.stringify(fetch): '...'} <br/>
    --------------------------------------
  </div> 
}
