import React, { useEffect, useState } from 'react'; 
import { ApolloProvider, gql } from "@apollo/client"; 


// --------------------------------------------------------
import { client } from '../apolloclient'; 
import { Dao } from '../libs/dao/dao.class'; 

export function ReadForms({SetStep}:{SetStep:(step:number)=>void}) { 
  const dao = new Dao(client); 
  const [ready, setReady] = useState(false); 
  const [fetch, setFetch] = useState([] as any[]); 

  function Fetch() { 
    dao.fetcher.Read('Form', 'title')
    .then( (res:any) => { 
      //console.log("fetcher", res.items); 
      setReady(true); 
      setFetch(res.items); 
      SetStep(1); 
      console.log(client.cache) 
    }) 
    .catch( err => { 
      //console.log("fetcher-error", err.errors); 
      setReady(false); 
      setFetch(err.errors); 
    }) 
  } 

  useEffect(() => { Fetch() }, []); 

  return <div> 
    {ready ? '!!!': '...'} <br/> 
    READ <br/> 
    {ready ? <div>
      {fetch.map( (item:any, i:number) => {
        return <div key={i} >
          {Object.keys(item).map( k => {
            return <span key={k}>{k}: {JSON.stringify(item[k])} __ </span>
          })}
        </div>
      })}
    </div>: '...'} <br/>
    --------------------------------------
  </div> 
}
