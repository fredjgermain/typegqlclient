import React, { useEffect, useState } from 'react'; 
import { ApolloProvider } from "@apollo/client"; 

//import { TestComponent } from '@fredjgermain/reactutils/lib/component/test.component'; 

// --------------------------------------------------------
import { client } from './libs/apolloclient'; 
import { Dao } from './libs/dao/dao.class';
//import { TestCrud, TestModel } from './components/testcrud.components'; 


export default function Apptypescript() { 
  //<Query_Test/> 
  // <Mutation_Create/> 
  return <ApolloProvider {...{client}} > 
    <TestCrud/> 
  </ApolloProvider> 
} 


function TestCrud() {
  const dao = new Dao(client); 
  const [ready, setReady] = useState(false); 
  const [res, setRes] = useState({} as any); 

  useEffect(() => { 
    dao.fetcher.Read({modelName:'Form'}) 
    .then( res => { 
      setReady(true); 
      console.log("res", res); 
      setRes(res); 
    }) 
    .catch( err => { 
      setReady(false); 
      setRes(err); 
    }) 
  }, []); 

  return <div> 
    {ready ? '!!!': '...'} <br/> 
    {JSON.stringify(res)} 
  </div> 
}

/*

function Mutation_Create() {
  const modelName = 'Form'; 
  const ids = ['asdas'] as string[]; 
  const inputs = [
    {fid:'asdsaasdasd', 
    title:['', ''], 
    description: ['', ''], 
  }] as any[]; 

  const [Create, {loading, error, data}] = useMutation(MUTATION_CREATE) 

  if(loading) 
    return <span>loading</span>; 
  if(error) 
    return <span>Error {error}</span>; 

  return <div> 
    <button onClick={() => Create({variables:{modelName}})}> 
      Create 
    </button> 
    { data && (data.Create as any[]).map( (d, i) => { 
      return <div key={i}> 
        {JSON.stringify(d)} 
      </div> 
    })} 
  </div> 
}

function Query_Test() { 
  const modelName = 'Form'; 
  const [Read, {loading, error, data}] = useLazyQuery(QUERY_READ) 

  if(loading) 
    return <span>loading</span>; 
  if(error) 
    return <span>Error {error}</span>; 

  return <div> 
    <button onClick={() => Read({ variables: {modelName} })}> 
      Read 
    </button> 
    { data && (data.Read as any[]).map( (d, i) => { 
      return <div key={i}> 
        {JSON.stringify(d)} 
      </div> 
    })} 
  </div> 
} 

import { ApolloClient, gql, NormalizedCacheObject, InMemoryCache } from '@apollo/client'; 
const cache = new InMemoryCache(); 


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: 'http://localhost:8000/graphgql',

  // Provide some optional constructor fields
  name: 'react-web-client',
  //version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});


client.query(

).then( res => console.log(res) ); */


/* 
const defaultOptions = { 
  watchQuery: { 
    fetchPolicy: 'cache-and-network', 
    errorPolicy: 'ignore', 
  }, 
  query: { 
    fetchPolicy: 'network-only', 
    errorPolicy: 'all', 
  }, 
  mutate: { 
    errorPolicy: 'all', 
  }, 
}; 


function Mutation_Test() { 
  const modelName = 'Form'; 
  const ids = ['asdas'] as string[]; 
  const inputs = [
    {fid:'asdsaasdasd', 
    title:['', ''], 
    description: ['', ''], 
  }] as any[]; 
  const [create, { data }] = useMutation(MUTATION_CREATE, ); 
  //const [testMutationName, { data }] = useMutation(MUTATION_TESTNAME); 
  //const [testMutationArgs, { data }] = useMutation(MUTATION_TESTARGS); 
  
  return <div> 
    <form
        onSubmit={e => {
          e.preventDefault();
          create({variables: {inputs, modelName}})
          //testMutationName({ variables: { modelName }}); 
          //testMutationArgs({ variables: { ids, modelName }}); 
          
        }}
      >
      <div> 
        {JSON.stringify(data)} 
      </div> 
      <button type="submit">Add Todo</button>
      </form>
  </div> 
} 
*/
