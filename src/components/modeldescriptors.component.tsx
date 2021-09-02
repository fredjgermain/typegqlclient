import React, { useEffect, useState } from 'react'; 
import { ApolloProvider, gql } from "@apollo/client"; 


// --------------------------------------------------------
import { client } from '../libs/apolloclient'; 
import { Dao } from '../libs/dao/dao.class'; 


export function GetModels() { 
  const dao = new Dao(client); 
  const [ready, setReady] = useState(false); 
  const [fetch, setFetch] = useState([] as any[]); 
  
  function Fetch() { 
    dao.fetcher.ModelDescriptors({}) 
    .then( (res:any) => { 
      //console.log("fetcher", res); 
      setReady(true); 
      setFetch(res); 
    }) 
    .catch( err => { 
      //console.log("fetcher-error", err); 
      setReady(false); 
      setFetch(err); 
    }) 
  } 

  useEffect(() => { Fetch() }, []); 

  const toDisplay = ready ? fetch.map( model => model.accessor) 
    .reduce( (prev, curr, i) => i ? `${prev}, ${curr}`: `${curr}`, '') : ''; 
  
  return <div> 
    {ready ? '!!!': '...'} <br/> 
    MODELDESCRIPTORS <br/> 
    {`[${toDisplay}]`} <br/> 
    --------------------------------------
  </div> 
}
