import { useEffect, useState } from "react"; 
import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// --------------------------------------------------------- 
//import { useQuery } from "@apollo/client"; 
import { GqlIntrospection } from './gqlimplement/introspection.class'; 
import { GqlCrud } from "./gqlimplement/crud.class"; 
import { GqlCrudCache } from "./gqlimplement/crudcache.class";



export function useQueryMutation(client:ApolloClient<NormalizedCacheObject>) { 
  const crud = new GqlCrud(client); 
  const cachecrud = new GqlCrudCache(client); 
  const introspect = new GqlIntrospection(client); 

  const defaultState = { 
    loading:false, 
    success:false, 
    result:undefined as any, 
    error:undefined as any, 
  } 
  const [state, setState] = useState(defaultState); 
  function SetState(newState:Partial<typeof defaultState>) { 
    setState( prev => {return {...prev, ...newState}}) 
  } 
  
  async function TypeIntrospection(args:Parameters<typeof introspect.TypeIntrospection>[0]) { 
    SetState({...defaultState, loading:true}) 
    await introspect.TypeIntrospection(args) 
      .then( result => SetState({...defaultState, result, success:true})) 
      .catch( error => SetState({...defaultState, error})); 
  }

  async function Models(args:Parameters<typeof crud.Models>[0]) { 
    SetState({...defaultState, loading:true}) 
    await crud.Models(args) 
      .then( result => SetState({...defaultState, result, success:true})) 
      .catch( error => SetState({...defaultState, error})); 
  } 

  async function Create(args:Parameters<typeof crud.Create>[0]) { 
    console.log(args); 
    SetState({...defaultState, loading:true}) 
    await crud.Create(args) 
      .then( result => SetState({...defaultState, result, success:true})) 
      .catch( error => SetState({...defaultState, error})); 
  } 

  async function Read(args:Parameters<typeof crud.Read>[0]) { 
    SetState({...defaultState, loading:true}) 
    await crud.Read(args) 
      .then( result => SetState({...defaultState, result, success:true})) 
      .catch( error => SetState({...defaultState, error})); 
  } 

  async function Update(args:Parameters<typeof crud.Update>[0]) { 
    SetState({...defaultState, loading:true}) 
    await crud.Update(args) 
      .then( result => SetState({...defaultState, result, success:true})) 
      .catch( error => SetState({...defaultState, error})); 
  } 

  async function Delete(args:Parameters<typeof crud.Delete>[0]) { 
    console.log(args);
    SetState({...defaultState, loading:true}) 
    await crud.Delete(args) 
      .then( result => SetState({...defaultState, result, success:true})) 
      .catch( error => SetState({...defaultState, error})); 
  } 
  
  return {state, SetState, TypeIntrospection, Models, Create, Read, Update, Delete, cachecrud}; 
} 

