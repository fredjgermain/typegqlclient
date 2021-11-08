import { useEffect, useState } from 'react';
import { Story } from '@storybook/react'; 
import { ApolloProvider } from '@apollo/client';



// -------------------------------------------------------- 
//import { useQueryMutation } from '../querymutation/useQueryMutation.hook'; 
import { client } from '../../dao/apolloclient'; 
import { GqlCrud } from '../querymutation/gqlimplement/crud.class'; 
import * as request from '../../dao/gql'; 
import { useQueryMutation } from '../querymutation/useQueryMutation.hook';
//import { DaoContexter } from '../../dao/daocontexter.component';



function QueryMutation({...props}:any) { 
  
  return <ApolloProvider {...{client}}> 
    <QueryMuationTester/> 
  </ApolloProvider> 
} 



function QueryMuationTester() { 
  const useqm = useQueryMutation(client); 
  const {state} = useqm; 

  // async function TestDelete({modelName, ids}:{modelName:string, ids?:string[]}) { 
  //   const subfields = '{_id}'; 
  //   const query = request.Read(modelName, subfields); 
  //   const mutation = request.Delete(modelName, subfields); 

  //   const entries = await dao.Query({query, variables:undefined}) 
  //   console.log(entries); // Parse entries ... to 
  //   const last = (entries as any[])?.pop() as {_id:string}; 
  //   const variables = {ids:[last].map(i => i._id)}; 
  //   await dao.Mutation({mutation, variables}) 
  //     .then( data => SetState({...defaultState, data, success:true})) 
  //     .catch( error => SetState({...defaultState, error})) 
  // } 
  //async function 

  const cachedata = (client.cache as any).data; 
  console.log( cachedata ); 

  const newA = {name:'testa'} as Partial<IEntry>; 

  function DeleteA() { 
    const entries = useqm.cachecrud.Read({modelName:'A'}); 
    const toDelete = (entries ?? []).find( e => e.name === newA.name); 
    const ids = toDelete?._id ? [toDelete._id] : []; 
    useqm.Delete({modelName:'A', ids}) 
  }


  return <div> 
    <button onClick={() => useqm.TypeIntrospection({modelName:'A'})} > 
      Type instrospection A</button><br/> 

    <button onClick={() => useqm.TypeIntrospection({modelName:'B'})} > 
      Type instrospection B</button><br/> 

    <button onClick={() => useqm.TypeIntrospection({modelName:'C'})} > 
      Type instrospection C</button><br/> 

    <button onClick={() => useqm.Models({modelNames:['A', 'B', 'C']})}> 
      Model A, B, C</button><br/> 

    <button onClick={() => useqm.Read({modelName:'A'}) }> 
      Read A</button> <br/>
    <button onClick={() => useqm.Read({modelName:'B'}) }> 
      Read B</button> <br/>
    <button onClick={() => useqm.Read({modelName:'C'}) }> 
      Read C</button> <br/>

    <button onClick={() => console.log(useqm.cachecrud.Read({modelName:'A'})) }> 
      Cache Read A</button> <br/>
    <button onClick={() => console.log(useqm.cachecrud.Read({modelName:'B'})) }> 
      Cache Read B</button> <br/>
    <button onClick={() => console.log(useqm.cachecrud.Read({modelName:'C'})) }> 
      Cache Read C</button> <br/>

    <button onClick={() => useqm.Create({modelName:'A', inputs:[newA]}) }> 
      Create A</button> <br/>

    <button onClick={DeleteA}>
      Delete A</button> <br/> 
    {/* <button onClick={() => useqm.Create({modelName:'B'}) }> 
      Read B</button> 
    <button onClick={() => useqm.Create({modelName:'C'}) }> 
      Read C</button>  */}
{/* 
    <button onClick={() => TestCreate({modelName:'A', inputs:[{name:'new A'}] }) }> 
      Create A</button> 
    <button onClick={() => TestCreate({modelName:'B', inputs:[{name:'new B'}] }) }> 
      Create B</button> 
    <br/>

    <button onClick={() => TestDelete({modelName:'A'}) }> 
      Delete A</button> 
    <button onClick={() => TestDelete({modelName:'B'}) }> 
      Delete B</button> 
    <br/> */}

    {state.success ? JSON.stringify(state.result) : JSON.stringify(state.error)} 
  </div> 
} 

export default { 
  title: 'Query/QueryMutation', 
  component: QueryMutation, 
} 

const Template:Story<any> = args => <QueryMutation {...args} /> 


export const TestQueryMutation = Template.bind({}) 
TestQueryMutation.args = { 
  values:['asdasdsa'], 
  //SetValue: (newValue:any[]) => console.log(newValue), 
  //onPressEnter: () => console.log('on Press Enter'), 
} 
