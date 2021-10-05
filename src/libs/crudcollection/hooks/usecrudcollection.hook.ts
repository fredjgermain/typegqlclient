import { useContext, useEffect, useState } from 'react'; 



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

export function useCrudCollection() { 
  //console.log('useCrud'); 
  const {dao} = useContext(DaoContext); 
  
  const [data, setData] = useState(defaultData); 
  function SetData(newData:Partial<TData>) { 
    const _data = newData ?? defaultData; // update with newData or reset to defaultData 
    setData( prev => { return {...prev, ..._data} }) 
  } 

  async function SetModel(model:IModel) { 
    if(IsEmpty(model)) return; 
    const newData:Partial<TData> = {  
      model, defaultEntry: dao.GetDefaultEntry(model), 
      ifieldsOptions: await dao.GetOptionsFromModel(model), 
      entries: await dao.Read({modelName:model.accessor}) 
    }
    SetData(newData); 
  }

  async function FetchEntries() { 
    const modelName = data.model.accessor; 
    if(!modelName) return; 
    await dao.Read({modelName}) 
      .then( entries => SetData({entries}) ) 
      .catch( errors => {
        const feedback = {action:EnumCrud.Read, success:false, feedback:errors}; 
        SetData({feedback}) 
      }); 
  } 

  async function FetchMutation({action, variables}:{action:EnumCrud, variables:any}) { 
    const modelName = data.model.accessor; 
    if(!modelName) return; 
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

  return {defaultData, data, SetData, SetModel, FetchEntries, FetchMutation, Submit, Cancel} 
}


