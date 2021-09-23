import {useEffect, useState} from 'react'; 
import { Dao } from '../dao/dao.class'; 
import { EntryEditor } from './entryeditor.component';
//import { useFetcher } from '../fetcher/usefetcher.hook'; 



type TUseCrudStatus = ReturnType<typeof useCrudStatus> 
function useCrudStatus() { 
  type TCrudStatus = {mode?:string, entry?:IEntry, feedback?:any[]} 
  const defaultCrudStatus:TCrudStatus = {mode:'read', entry:{} as IEntry, feedback:[] as any[]} 
  const [crudStatus, setCrudStatus] = useState(defaultCrudStatus); 

  function SetCrudStatus(newCrudStatus?:TCrudStatus) { 
    if(!newCrudStatus) 
      setCrudStatus(defaultCrudStatus); 
    setCrudStatus( prev => { return {...prev, ...newCrudStatus} }) 
  } 

  return {crudStatus, SetCrudStatus}; 
} 



function useCrudData(dao:Dao, modelName:string) { 
  type TCrudData = { 
    model?:IModel, entries?:IEntry[], defaultEntry?:IEntry, 
    ifieldsOptions?: { [key:string]:IOption[] } 
  } 

  const defaultCrudData:TCrudData = { model:{} as IModel, entries:[], defaultEntry:{} as IEntry, ifieldsOptions:{}} 

  const [data, setData] = useState(defaultCrudData); 
  function SetData(newData:any) { 
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
    const _model = data.model ?? model; 
    if(!_model) 
      return {entries: defaultCrudData.entries, ifieldsOptions: defaultCrudData.ifieldsOptions} 
    const entries = await dao.Read({modelName}); 
    const ifieldsOptions = await dao.GetOptionsFromIFields(_model.ifields); 
    return {entries, ifieldsOptions}; 
  } 

  return {data, SetData, FetchData, FetchModel, FetchEntriesOptions} 
} 



type TUseCrudCollection = ReturnType<typeof useCrudCollection>; 
function useCrudCollection({dao, modelName}:{dao:Dao, modelName:string}) { 
  const {crudStatus, SetCrudStatus} = useCrudStatus(); 
  const {data, SetData, FetchData, FetchModel, FetchEntriesOptions} = useCrudData(dao, modelName); 

  useEffect(() => { 
    FetchData() 
      .then( res => SetData(res) ) 
  }, [modelName]); 


  function Submit() { 
    const {entry, mode} = crudStatus; 
    const inputs = [entry]; 
    const ids = inputs.map( e => e?._id ?? ''); 

    const action = 
      mode === 'create' ? dao.Create({modelName, inputs}) : 
      mode === 'update' ? dao.Update({modelName, inputs}) : 
      mode === 'delete' ? dao.Delete({modelName, ids}) : 
      ( async () => [] as IEntry[] )(); 

    action 
      .then( feedback => SetCrudStatus({feedback}) ) // success update entries with modification ?? or read again 
      .catch( feedback => SetCrudStatus({feedback}) ) // error update entries with modification ?? or read again 
  } 

  return {crudStatus, SetCrudStatus, data, FetchData, FetchModel, FetchEntriesOptions, Submit} 
} 

// --------------------------------------------------------
export function CollectionEditor({dao, modelName}:{dao:Dao, modelName:string}) { 
  const {crudStatus, SetCrudStatus, data, Submit} = useCrudCollection({dao, modelName}) 
  const {mode, feedback} = crudStatus; 
  const {model, defaultEntry} = data; 

  const entry = crudStatus.entry ?? defaultEntry ?? {} as IEntry; 
  function SetEntry(entry:IEntry) { SetCrudStatus({entry}) } 

  const ifields = model?.ifields ?? [] as IField[]; 
  const ifieldsOptions = data.ifieldsOptions ?? {}; 

  return <div> 
    <div>
      FEEDBACK <br/>
      {JSON.stringify(feedback)} 
    </div>

    <div>
      Entry <br/>
      {JSON.stringify(entry)} 
    </div>

    <h4>{mode} : {model?.accessor}</h4> 
    <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 

  </div> 
} 