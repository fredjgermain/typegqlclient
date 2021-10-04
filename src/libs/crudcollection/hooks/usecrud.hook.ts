import { useContext, useState } from 'react'; 



// --------------------------------------------------------
import { DaoContext } from '../../dao/daocontexter.component'; 
import { EnumCrud } from '../../dao/dao.class'; 
import { IsEmpty } from '../../utils'; 


type TData = typeof defaultData; 
const defaultData = { 
  model:{} as IModel, 
  entries:[] as IEntry[], 
  defaultEntry:{} as IEntry, 
  ifieldsOptions:{} as { [key:string]:IOption[] }, 
  
  entry:{} as IEntry, 
  mode:EnumCrud.Create, 
  feedback: {action: EnumCrud.Create, success:false, feedback:{} as any}, 
} 

export function useCrud({modelName}:{modelName:string}) { 
  //console.log('useCrud'); 
  const {dao} = useContext(DaoContext); 

  const [data, setData] = useState(defaultData); 
  function SetData(newData:Partial<TData>) { 
    const _data = newData ?? defaultData; // update with newData or reset to defaultData 
    setData( prev => { return {...prev, ..._data} }) 
  } 

  async function FetchModel() { 
    const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
    const data:Partial<TData> = IsEmpty(model) ? 
      {...defaultData} : 
      {model, defaultEntry:dao.GetDefaultEntry(model), ifieldsOptions:dao.GetOptionsFromModel(model) } 
    SetData(data); 
  } 

  async function FetchEntries() { 
    await dao.Read({modelName}) 
      .then( entries => SetData({entries}) ) 
      .catch( errors => {
        const feedback = {action:EnumCrud.Read, success:false, feedback:errors}; 
        SetData({feedback}) 
      }); 
  } 

  async function FetchMutation({action, variables}:{action:EnumCrud, variables:any}) { 
    const mutationPromise = (dao as any)[action]({modelName, ...variables}) as Promise<IEntry[]>; 
    await mutationPromise 
      .then( results => { 
        const feedback = {action, success:true, feedback:results}; 
        SetData({feedback}) 
      }) 
      .catch( errors => { 
        const feedback = {action, success:false, feedback:errors}; 
        SetData({feedback}) 
      })
  }

  async function Submit(entry:IEntry) { 
    const action = data.mode; 
    const variables = data.mode === EnumCrud.Delete ? {ids:[entry._id]} : {inputs:[entry]} 
    await FetchMutation({action, variables}) 
      .then( () => FetchEntries() ); 
  } 

  function Cancel() { 
    const {mode, entry} = defaultData; 
    SetData({mode, entry}); 
  } 

  return {defaultData, data, SetData, FetchModel, FetchEntries, FetchMutation, Submit, Cancel} 
}


