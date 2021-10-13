import { useReducer } from 'react'; 



export interface IState { 
  busy: boolean, 
  ready: boolean, 
  success: boolean, 
  result: any, 
  error: any, 
} 

const init:IState = { 
  busy: false, 
  ready: false, 
  success: false, 
  result: null, 
  error: null, 
}


interface Action { 
  type: string, 
  payload: any, 
} 

const reducer = (state:IState, action:Action):IState => {
  switch(action.type) { 
    case 'IS_BUSY' : { 
      return { 
        busy: true, 
        ready: false, 
        success: false, 
        result: null, 
        error: null, 
      } as IState; 
    } 
    case 'FETCH_SUCCESS': 
      return { 
        busy: false, 
        ready: true, 
        success: true, 
        result: action.payload, 
        error: null, 
      } as IState; 
    case 'FETCH_ERROR': 
      return { 
        busy: false, 
        ready: true, 
        success: false, 
        result: null, 
        error: action.payload, // error message 
      } as IState; 
    default: 
      return state; 
  } 
} 

export type TFetchCallBack = { 
  fetchFunc: () => Promise<any>, 
  successCallBack?: (result:any) => void, 
  errorCallBack?: (error:any) => void, 
} 


interface UseFetcher { 
  state:IState; 
  Fetch:( {fetchFunc, successCallBack, errorCallBack}:TFetchCallBack ) => Promise<void>; 
} 
export function useFetcher(): UseFetcher { 
  const [state, dispatch] = useReducer<(state: IState, action: Action) => IState>(reducer, init); 

  const Fetch = async ( {fetchFunc, successCallBack, errorCallBack }:TFetchCallBack ) => { 
    dispatch({type:'IS_BUSY', payload:undefined}) 
    // Loader has finished
    await fetchFunc().then( res => { 
      if(successCallBack) 
        successCallBack(res); 
      dispatch({type:'FETCH_SUCCESS', payload:res} ) 
    }) 
    .catch( err => { 
      if(errorCallBack) 
        errorCallBack(err); 
      dispatch({type:'FETCH_ERROR', payload:err} ) 
    }) 
  } 
  return {state, Fetch}; 
} 

