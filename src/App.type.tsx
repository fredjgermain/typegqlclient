import React, { useEffect, useState } from 'react'; 
import { ApolloProvider, gql } from "@apollo/client"; 


// --------------------------------------------------------
import { client } from './libs/dao/apolloclient'; 
import { GetModels } from './components/modeldescriptors.component'; 

import * as request from './libs/dao/gql'; 
import { CreateForm } from './components/createform.component'; 
import { ReadForms } from './components/readforms.component'; 
import { UpdateForm } from './components/updateform.component'; 
import { DeleteForm } from './components/deleteform.component'; 
import { Dao } from './libs/dao/dao.class'; 




export default function Apptypescript() { 
  return <ApolloProvider {...{client}} > 
    <TestCrud/> 
  </ApolloProvider> 
} 


function TestCrud() { 
  const dao = new Dao(client); 

  const [step, setStep] = useState(0); 
  const SetStep = (step:number) => setStep(step) 

  const query = request.Read('Form', '{_id}'); 

  /*const query = gql` 
    query Read($ids: [String!]) { 
      Read${modelName}(ids:$ids) { 
        items ${subfields} 
        errors 
      } 
    }` */
  const variables = {ids:undefined} 


  if(step >= 2) { 
    console.log(client.cache); 
    const result = client.readQuery({query, variables}); 
    console.log("cacher", result); 
  }
  
  
  return <div> 

    <GetModels/> 
    <ReadForms {...{SetStep}}/> 
    <CreateForm/> 
    {step >= 1 && <UpdateForm/> } 
    {step >= 1 && <DeleteForm {...{SetStep}}/> } 

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
