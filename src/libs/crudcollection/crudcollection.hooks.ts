import {useContext, useEffect, useState} from 'react'; 


// --------------------------------------------------------
import { DaoContext } from '../dao/daocontexter.component';



function useCrudStatus() { 
  const defaultCrudStatus = { 
    mode:'create', 
    entry:{} as IEntry, 
    busy: false, 
    ready: true, 
    success: true, 
    feedback:[] as any[] 
  } 
  type TCrudStatus = typeof defaultCrudStatus; 
  const [crudStatus, setCrudStatus] = useState(defaultCrudStatus); 

  function SetCrudStatus(newCrudStatus?:Partial<TCrudStatus>) { 
    if(!newCrudStatus) 
      setCrudStatus(defaultCrudStatus); 
    setCrudStatus( prev => { return {...prev, ...newCrudStatus} }) 
  } 

  return {crudStatus, SetCrudStatus}; 
} 



function useDataFetcher(modelName:string) { 
  const {dao} = useContext(DaoContext); 
  const defaultData = { 
    model:{} as IModel, 
    entries:[] as IEntry[], 
    defaultEntry:{} as IEntry, 
    ifieldsOptions:{} as { [key:string]:IOption[] } 
  } 

  type TData = typeof defaultData; 
  const [data, setData] = useState(defaultData); 
  function SetData(newData:Partial<TData>) { 
    if(!newData) 
      setData(newData); 
    setData( prev => { return {...prev, ...newData} }) 
  } 

  async function FetchData() { 
    const {model, defaultEntry} = await FetchModel(); 
    const {entries, ifieldsOptions} = await FetchEntriesOptions(model); 
    return {model, defaultEntry, entries, ifieldsOptions}; 
  } 

  async function FetchModel() { 
    const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
    const defaultEntry = dao.GetDefaultEntry(model); 
    return {model, defaultEntry}; 
  } 

  async function FetchEntriesOptions(model?:IModel) { 
    const _model = model ?? data.model; 
    let {entries, ifieldsOptions} = defaultData; 
    if(!_model) 
      return {entries, ifieldsOptions}; 
    entries = await dao.Read({modelName}); 
    ifieldsOptions = await dao.GetOptionsFromIFields(_model.ifields); 
    return {entries, ifieldsOptions}; 
  } 

  return {data, SetData, FetchData, FetchModel, FetchEntriesOptions} 
} 



export function useCrud({modelName}:{modelName:string}) { 
  const {dao} = useContext(DaoContext); 
  const {crudStatus, SetCrudStatus} = useCrudStatus(); 
  const usedata = useDataFetcher(modelName); 
  const {data, SetData, FetchData, FetchEntriesOptions} = usedata; 
  
  useEffect(() => { 
    FetchData() 
      .then( res => { 
        SetCrudStatus({entry:res.defaultEntry}) 
        SetData(res) 
      }) 
  }, [modelName]); 



  function Submit() { 
    const {entry, mode} = crudStatus; 
    const inputs = [entry]; 
    const ids = inputs.map( e => e?._id ?? ''); 

    SetCrudStatus({busy:true, ready:false, success:false, feedback:[]}) 

    const action = 
      mode === 'create' ? dao.Create({modelName, inputs}) : 
      mode === 'update' ? dao.Update({modelName, inputs}) : 
      mode === 'delete' ? dao.Delete({modelName, ids}) : 
      ( async () => [] as IEntry[] )(); 

    action 
      .then( feedback => { 
        FetchEntriesOptions() 
          .then( res => { 
            SetData({...res}) 
            SetCrudStatus({busy:false, ready:true, success:true, feedback}) 
          }) 
      }) // success update entries with modification ?? or read again 
      .catch( feedback => SetCrudStatus({busy:false, ready:true, success:false, feedback}) ) // error update entries with modification ?? or read again 
  } 

  /*function RefreshEntriesOptions() { 
    FetchEntriesOptions() 
      .then( res => ) 
  }*/

  return { crudStatus, SetCrudStatus, ...usedata, Submit }  
} 