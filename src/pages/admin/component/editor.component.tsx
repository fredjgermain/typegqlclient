import { useContext, useState } from 'react'; 

// ----------------------------------------------------------- 
import { useFetcher } from '../../../libs/fetcher/usefetcher.hook'; 
import { Input, InputArray, InputSelect } from '../../../libs/inputs'; 
import { AdminContext } from '../admin.page'; 
import { TableContext } from '../../../libs/components/table/_table'; 
import { IAdminTableContext } from './admintable.component'; 


type TFunc = { 
  fetchFunc: () => Promise<any>, 
  successCallBack?: (result:any) => void, 
  errorCallBack?: (error:any) => void, 
} 

export function Editor() { 
  const {dao} = useContext(AdminContext); 
  const {model, useedition} = useContext(TableContext) as IAdminTableContext; 
  const {entry, SetEntry, mode, SetMode} = useedition; 

  const {state:{busy, ready, success, result, error}, Fetch} = useFetcher(); 
  const modelName = model.accessor; 

  const fetchFunc = 
    mode === 'create' ? async () => await dao.Create({modelName, inputs:[entry]}) : 
    mode === 'update' ? async () => await dao.Update({modelName, inputs:[entry]}) : 
    mode === 'delete' ? async () => await dao.Delete({modelName, ids:[entry?._id ?? '']}) : 
    () => {}; 

  const editFunc = { fetchFunc }; 

  const ifields = model.ifields; 
  
  return <div> 
    {ifields.map( ifield => { 
      const key = ifield.accessor; 
      const value = _entry[key]; 
      const onChange = (newValue:any) => { 
        const newEntry = {..._entry}; 
        newEntry[key] = newValue; 
        setEntry(newEntry); 
      } 
      return <EditField  key={key} {...{value, ifield, options:options ?? [], onChange }} /> 
    })} 

    <button onClick={ () => Fetch(editFunc) }> 
      Confirm 
    </button> 
    <button> 
      Cancel Return Mode and Entry to their default value. 
    </button> 
  </div> 
} 



export function EditField({...props}:{ value:any, ifield:IField, options:IOption[], onChange:(newValue:any)=>void }) { 
  const [value, setValue] = useState(props.value); 
  const label = props.ifield.label[0]; 
  const {ifield, options} = props; 
  const type = ifield.type.name; 

  const onPressEnter = () => props.onChange(value); 
  const onSetValue = (newValue:any) => setValue(newValue); 

  if(ifield.isRef || ifield.type.isEnum) { 
    return <div> 
      {label}: <InputSelect {...{ value, onSetValue, options, multiple:ifield.type.isArray }} /> 
    </div>
  } 

  if(ifield.type.isArray) { 
    return <div>
      {label}: <InputArray {...{ value, type, onSetValue }} /> 
    </div>
  } 

  return <div> 
    {label}: <Input {...{ value, type, onSetValue, onPressEnter}} /> 
  </div> 
}

