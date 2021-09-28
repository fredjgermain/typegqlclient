import { useContext, useState } from 'react'; 



// --------------------------------------------------------
import { DaoContext } from '../../dao/daocontexter.component';
import { IsEmpty } from '../../utils';



export enum EnumMode {create='create', update='update', delete='delete'}
//type TMode = 'create' | 'update' | 'delete'; 
type TCrud = typeof defaultCrud; 
type TData = typeof defaultData; 

const defaultCrud = { 
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

  const [crudState, setCrudState] = useState({crud:defaultCrud as TCrud, data:defaultData as TData}); 
  function SetCrudState(newCrudState:{crud?:Partial<TCrud>, data?:Partial<TData>}) { 
    setCrudState( prev => { 
      //console.log(newCrudState.data?.entries); 
      const crud = {...prev.crud, ...newCrudState.crud}; 
      const data = {...prev.data, ...newCrudState.data}; 
      return {crud, data}; 
    }) 
  } 
  const {crud, data} = crudState; 
  function SetCrud(newCrud?:Partial<TCrud>) { SetCrudState({crud:newCrud}) } 
  function SetData(newData?:Partial<TData>) { SetCrudState({data:newData}) } 



  // FETCH ------------------------------------------------ 
  function FetchModelEntries() { Fetch(AsyncModelEntries) } 
  function FetchModel() { Fetch(AsyncModel) } 
  
  function FetchCreate() { Fetch(AsyncCreate) } 
  function FetchRead() { Fetch(AsyncRead) } 
  function FetchUpdate() { Fetch(AsyncUpdate) } 
  function FetchDelete() { Fetch(AsyncDelete) } 

  type TAsyncAction = () => Promise<{data?:Partial<TData>, crud?:Partial<TCrud>}> 
  function Fetch(func:TAsyncAction) { 
    // reset for new fetch 
    SetCrud({ busy:true, ready:false, success:false }) 

    func() 
      .then( res => { 
        const crud = {...(res.crud ?? {}), ...{busy:false, ready:true, success:true}} 
        SetCrudState({data:res.data, crud}) 
      }) 
      .catch( err => { 
        SetCrud({busy:false, ready:true, success:false, feedback:[err]}) 
      }) 
  } 

  async function AsyncModelEntries() { 
    const asyncmodel = await AsyncModel(); 
    const asyncread = await AsyncRead(asyncmodel.data.model); 
    const data = {...asyncmodel.data, ...asyncread.data}; 
    const crud = {...asyncmodel.crud, ...asyncread.crud}; 
    return {data, crud}; 
  } 

  async function AsyncModel() { 
    const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
    const defaultEntry = dao.GetDefaultEntry(model); 
    return {data:{model, defaultEntry}, crud:{entry:defaultEntry}}; 
  } 

  async function AsyncRead(model?:IModel) { 
    const data = crudState.data; 
    const _model = model ?? data?.model; 
    let {entries, ifieldsOptions} = defaultData; 
    if(!IsEmpty(_model)) { 
      entries = await dao.Read({modelName}); 
      console.log(entries); 
      ifieldsOptions = await dao.GetOptionsFromModel(_model); 
    } 
    return {data:{entries, ifieldsOptions}, crud:{}} 
  } 

  async function AsyncCreate() { 
    const inputs = [crud.entry as IEntry]; 
    const feedback = await dao.Create({modelName, inputs}); 
    const entries = await dao.Read({modelName}); 
    const data = {...crudState.data, } 
    return {data, crud:{feedback}} 
  } 

  async function AsyncUpdate() { 
    const inputs = [crud.entry as IEntry]; 
    const feedback = await dao.Update({modelName, inputs}); 
    const {data} = await AsyncRead(); 
    return {data, crud:{feedback}} 
  } 

  async function AsyncDelete() { 
    const inputs = [crud.entry as IEntry]; 
    const ids = inputs.map( e => e?._id ?? ''); 
    const feedback = await dao.Delete({modelName, ids}); 
    const {data} = await AsyncRead(); 
    return {data, crud:{feedback}} 
  } 

  function Submit() { 
    const {mode} = crud; 
    mode === EnumMode.create ? FetchCreate() : 
    mode === EnumMode.update ? FetchUpdate() : 
    mode === EnumMode.delete ? FetchDelete() : 
      (() => {})(); 
  } 

  return { data, crud, SetData, SetCrud, FetchModelEntries, FetchModel, FetchRead, Submit } 
} 

