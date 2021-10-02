import { useContext, useState } from 'react'; 



// --------------------------------------------------------
import { DaoContext } from '../../dao/daocontexter.component';
import { IsEmpty } from '../../utils';




export enum EnumMode {create='create', update='update', delete='delete'}
//type TMode = 'create' | 'update' | 'delete'; 
type TStatus = typeof defaultState; 
type TData = typeof defaultData; 

const defaultState = { 
  busy: false, 
  ready: false, 
  success: false, 
  mode: EnumMode.create as EnumMode, 
  entry:{} as IEntry, 
  feedback:[] as any[] 
} 

const defaultData = { 
  model:{} as IModel, 
  entries:[] as IEntry[], 
  defaultEntry:{} as IEntry, 
  ifieldsOptions:{} as { [key:string]:IOption[] } 
} 




export function useCrud({modelName}:{modelName:string}) { 
  const {dao} = useContext(DaoContext); 

  const [crudState, setCrudState] = useState({status:defaultState as TStatus, data:defaultData as TData}); 
  function SetCrudState(newCrudState:{status?:Partial<TStatus>, data?:Partial<TData>}) { 
    setCrudState( prev => { 
      const status = {...prev.status, ...newCrudState.status}; 
      const data = {...prev.data, ...newCrudState.data}; 
      return {status, data}; 
    }) 
  } 
  const {status, data} = crudState; 
  function SetStatus(newStatus?:Partial<TStatus>) { SetCrudState({status:newStatus ?? defaultState}) } 
  function SetData(newData?:Partial<TData>) { SetCrudState({data:newData ?? defaultData}) } 



  // FETCH ------------------------------------------------ 
  function FetchModelEntries() { Fetch(AsyncModelEntries()) } 
  function FetchModel() { Fetch(AsyncModel()) } 
  
  function FetchCreate(entry:IEntry) { Fetch(AsyncCreate(entry)) } 
  function FetchRead() { Fetch(AsyncRead()) } 
  function FetchUpdate(entry:IEntry) { Fetch(AsyncUpdate(entry)) } 
  function FetchDelete(entry:IEntry) { Fetch(AsyncDelete(entry)) } 

  type TPromise = Promise<{data?:Partial<TData>, status?:Partial<TStatus>}> 
  function Fetch(promise:TPromise) { 
    // reset for new fetch 
    SetStatus({ busy:true, ready:false, success:false }) 

    promise
      .then( res => { 
        const status = {...(res.status ?? {}), ...{busy:false, ready:true, success:true}} 
        SetCrudState({data:res.data, status}) 
      }) 
      .catch( err => { 
        SetStatus({busy:false, ready:true, success:false, feedback:[err]}) 
      }) 
  } 

  async function AsyncModelEntries() { 
    const asyncmodel = await AsyncModel(); 
    const asyncread = await AsyncRead(asyncmodel.data.model); 
    const data = {...asyncmodel.data, ...asyncread.data}; 
    const status = {...asyncmodel.status, ...asyncread.status}; 
    return {data, status}; 
  } 

  async function AsyncModel() { 
    const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
    const defaultEntry = dao.GetDefaultEntry(model); 
    return {data:{model, defaultEntry}, status:{entry:defaultEntry}}; 
  } 

  async function AsyncRead(model?:IModel) { 
    const data = crudState.data; 
    const _model = model ?? data?.model; 
    let {entries} = defaultData; 
    if(!IsEmpty(_model)) { 
      entries = await dao.Read({modelName}); 
    } 
    return {data:{entries}, status:{}} 
  } 

  async function AsyncCreate(entry:IEntry) { 
    const inputs = [entry as IEntry]; 
    const feedback = await dao.Create({modelName, inputs}); 
    const {data} = await AsyncRead(); 
    return {data, status:{feedback}} 
  } 

  async function AsyncUpdate(entry:IEntry) { 
    const inputs = [entry as IEntry]; 
    const feedback = await dao.Update({modelName, inputs}); 
    const {data} = await AsyncRead(); 
    return {data, status:{feedback}} 
  } 

  async function AsyncDelete(entry:IEntry) { 
    const inputs = [entry as IEntry]; 
    const ids = inputs.map( e => e?._id ?? ''); 
    const feedback = await dao.Delete({modelName, ids}); 
    const {data} = await AsyncRead(); 
    return {data, status:{feedback}} 
  } 

  function Submit(entry:IEntry) { 
    const {mode} = status; 
    mode === EnumMode.create ? FetchCreate(entry) : 
    mode === EnumMode.update ? FetchUpdate(entry) : 
    mode === EnumMode.delete ? FetchDelete(entry) : 
      (() => {})(); 
  } 

  return { data, status, SetData, SetStatus, FetchModelEntries, FetchModel, FetchRead, Submit } 
} 

