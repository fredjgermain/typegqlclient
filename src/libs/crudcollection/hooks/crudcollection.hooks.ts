import { useContext, useState } from 'react'; 



// --------------------------------------------------------
import { DaoContext } from '../../dao/daocontexter.component';


const defaultCrud = { 
  busy: false, 
  ready: false, 
  success: false, 
  mode:'create', 
  entry:{} as IEntry, 
  feedback:[] as any[] 
} 

const defaultData = { 
  model:{} as IModel, 
  entries:[] as IEntry[], 
  defaultEntry:{} as IEntry, 
  ifieldsOptions:{} as { [key:string]:IOption[] } 
} 

type TCrud = typeof defaultCrud; 
type TData = typeof defaultData; 



export function useCrud({modelName}:{modelName:string}) { 
  const {dao} = useContext(DaoContext); 

  // Crud ------------------------------------------------- 
  const [crud, setCrud] = useState(defaultCrud as TCrud); 
  function SetCrud(newCrudStatus?:Partial<TCrud>) { 
    newCrudStatus ? 
      setCrud( prev => {return {...prev, ...newCrudStatus}} ): 
      setCrud( defaultCrud ); 
  } 

  // data ------------------------------------------------- 
  const [data, setData] = useState(defaultData as TData); 
  function SetData(newData?:Partial<TData>) { 
    newData ? 
      setData( prev => {return {...prev, ...newData}} ): 
      setData( defaultData ); 
  } 


  // FETCH ------------------------------------------------ 
  function FetchModelEntries() { Fetch(AsyncModelEntries) } 
  function FetchModel() { Fetch(AsyncModel) } 
  
  function FetchCreate() { Fetch(AsyncCreate) } 
  function FetchRead() { Fetch(AsyncRead) } 
  function FetchUpdate() { Fetch(AsyncUpdate) } 
  function FetchDelete() { Fetch(AsyncDelete) } 

  type AsyncAction = () => Promise<{data?:Partial<TData>, crud?:Partial<TCrud>}> 
  function Fetch(func:AsyncAction) { 
    // reset for new fetch 
    SetCrud({ busy:true, ready:false, success:false }) 

    func() 
      .then( res => { 
        SetCrud( {...(res.crud ?? {}), ...{busy:false, ready:true, success:true}} ) 
        SetData(res.data); 
      }) 
      .catch( err => { 
        SetCrud({busy:false, ready:true, success:false, feedback:[err]}) 
      }) 
  } 

  async function AsyncModelEntries() { 
    const {data:{model, defaultEntry}} = await AsyncModel(); 
    const {data:{entries, ifieldsOptions}} = await AsyncRead(model); 
    return {data:{model, defaultEntry, entries, ifieldsOptions}}; 
  } 

  async function AsyncModel() { 
    const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
    const defaultEntry = dao.GetDefaultEntry(model); 
    return {data:{model, defaultEntry}}; 
  } 

  async function AsyncRead(model?:IModel) { 
    const _model = model ?? data?.model; 
    let {entries, ifieldsOptions} = defaultData; 
    if(_model) { 
      entries = await dao.Read({modelName}); 
      ifieldsOptions = await dao.GetOptionsFromIFields(_model.ifields); 
    } 
    return {data:{entries, ifieldsOptions}}
  } 

  async function AsyncCreate() { 
    const inputs = [crud.entry as IEntry]; 
    const feedback = await dao.Create({modelName, inputs}); 
    const {data} = await AsyncRead(); 
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
    mode === 'create' ? FetchCreate() : 
    mode === 'update' ? FetchUpdate() : 
    mode === 'delete' ? FetchDelete() : () => {} ;
  }


  // function Submit() { 
  //   const {entry, mode} = crud; 
  //   const inputs = [entry as IEntry]; 
  //   const ids = inputs.map( e => e?._id ?? ''); 

  //   SetCrud({busy:true, ready:false, success:false, feedback:[]}) 

  //   const action = 
  //     mode === 'create' ? dao.Create({modelName, inputs}) : 
  //     mode === 'update' ? dao.Update({modelName, inputs}) : 
  //     mode === 'delete' ? dao.Delete({modelName, ids}) : 
  //     ( async () => [] as IEntry[] )(); 

  //   action 
  //     .then( feedback => { 

  //       // useAsyncEntries to refresh entries. 
  //       AsyncRead() 
  //         .then( data => { 
  //           SetData({...data}) 
  //           SetCrud({busy:false, ready:true, success:true, feedback}) 
  //         }) 
  //     }) // success update entries with modification ?? or read again 
  //     .catch( feedback => { 
  //       SetCrud({busy:false, ready:true, success:false, feedback}) 
  //     }) 
  //     // error update entries with modification ?? or read again 
  // } 

  return { data, crud, SetData, SetCrud, FetchModelEntries, FetchModel, FetchRead, Submit } 
} 


// function useCrudStatus() { 
//   const defaultCrudStatus = { 
//     mode:'create', 
//     entry:{} as IEntry, 
//     busy: false, 
//     ready: false, 
//     success: false, 
//     feedback:[] as any[] 
//   } 
//   type TCrudStatus = typeof defaultCrudStatus; 
//   const [crudStatus, setCrudStatus] = useState(defaultCrudStatus); 

//   function SetCrudStatus(newCrudStatus?:Partial<TCrudStatus>) { 
//     if(!newCrudStatus) 
//       setCrudStatus(defaultCrudStatus); 
//     setCrudStatus( prev => { return {...prev, ...newCrudStatus} }) 
//   } 

//   return {crudStatus, SetCrudStatus}; 
// } 



// function useDataFetcher(modelName:string) { 
//   const {dao} = useContext(DaoContext); 
//   const defaultData = { 
//     model:{} as IModel, 
//     entries:[] as IEntry[], 
//     defaultEntry:{} as IEntry, 
//     ifieldsOptions:{} as { [key:string]:IOption[] } 
//   } 

//   type TData = typeof defaultData; 
//   const [data, setData] = useState(defaultData); 
//   function SetData(newData:Partial<TData>) { 
//     if(!newData) 
//       setData(newData); 
//     setData( prev => { return {...prev, ...newData} }) 
//   } 

//   async function FetchData() { 
//     const {model, defaultEntry} = await FetchModel(); 
//     const {entries, ifieldsOptions} = await FetchEntriesOptions(model); 
//     return {model, defaultEntry, entries, ifieldsOptions}; 
//   } 

//   async function FetchModel() { 
//     const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
//     const defaultEntry = dao.GetDefaultEntry(model); 
//     return {model, defaultEntry}; 
//   } 

//   async function FetchEntriesOptions(model?:IModel) { 
//     const _model = model ?? data.model; 
//     let {entries, ifieldsOptions} = defaultData; 
//     if(!_model) 
//       return {entries, ifieldsOptions}; 
//     entries = await dao.Read({modelName}); 
//     ifieldsOptions = await dao.GetOptionsFromIFields(_model.ifields); 
//     return {entries, ifieldsOptions}; 
//   } 

//   return {data, SetData, FetchData, FetchModel, FetchEntriesOptions} 
// } 



// export function useCrud({modelName}:{modelName:string}) { 
//   const {dao} = useContext(DaoContext); 
//   const {crudStatus, SetCrudStatus} = useCrudStatus(); 
//   const usedata = useDataFetcher(modelName); 
//   const {data, SetData, FetchData, FetchEntriesOptions} = usedata; 
  
//   useEffect(() => { 
//     FetchData() 
//       .then( res => { 
//         SetCrudStatus({entry:res.defaultEntry}) 
//         SetData(res) 
//       }) 
//   }, [modelName]); 



//   function Submit() { 
//     const {entry, mode} = crudStatus; 
//     const inputs = [entry]; 
//     const ids = inputs.map( e => e?._id ?? ''); 

//     SetCrudStatus({busy:true, ready:false, success:false, feedback:[]}) 

//     const action = 
//       mode === 'create' ? dao.Create({modelName, inputs}) : 
//       mode === 'update' ? dao.Update({modelName, inputs}) : 
//       mode === 'delete' ? dao.Delete({modelName, ids}) : 
//       ( async () => [] as IEntry[] )(); 

//     action 
//       .then( feedback => { 
//         FetchEntriesOptions() 
//           .then( res => { 
//             SetData({...res}) 
//             SetCrudStatus({busy:false, ready:true, success:true, feedback}) 
//           }) 
//       }) // success update entries with modification ?? or read again 
//       .catch( feedback => SetCrudStatus({busy:false, ready:true, success:false, feedback}) ) // error update entries with modification ?? or read again 
//   } 

//   /*function RefreshEntriesOptions() { 
//     FetchEntriesOptions() 
//       .then( res => ) 
//   }*/

//   return { crudStatus, SetCrudStatus, ...usedata, Submit }  
// } 