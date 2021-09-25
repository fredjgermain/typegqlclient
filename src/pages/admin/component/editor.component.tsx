import { useContext } from 'react'; 


// ----------------------------------------------------------- 
//import { EntryEditor } from '../../../libs/editor/en.component'; 
import { IsEmpty } from '../../../libs/utils'; 
import { AdminTableContext } from './admintable.component'; 
import { AdminContext } from '../admin.page'; 


/** Editor 
 * 
 * @returns 
 */
export function Editor() { 
  const {model, ifieldsOptions, useedition} = useContext(AdminTableContext); 
  const {entry, SetEntry, mode, feedback} = useedition; 
  const ifields = model.ifields.filter( f => !f.accessor.includes('_') ); 
  const label = model.label; 

  //console.log(ifields); 

  return <div> 
    <h4>{label[0]}</h4> 
    <div>{JSON.stringify(feedback)}</div> 
    <div>{mode}</div> 
    { !IsEmpty(entry) && <div> 
      <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /><SubmitBtn/><CancelBtn/>
    </div> } 
  </div> 
}



export function SubmitBtn() { 
  const { dao } = useContext(AdminContext); 
  const { model, useedition:{entry, mode, SetFeedback} } = useContext(AdminTableContext); 
  const modelName = model.accessor; 
  const inputs = [entry]; 

  const Create = () => { 
    dao.Create({modelName, inputs}) 
      .then( res => SetFeedback(res) ) 
      .catch( err => SetFeedback(err) ) 
  }

  const Update = () => { 
    dao.Update({modelName, inputs}) 
      .then( res => SetFeedback(res) ) 
      .catch( err => SetFeedback(err) ) 
  }

  return <span> 
    { mode === 'create' ? <button onClick={Create}>Create</button> : 
      mode === 'update' ? <button onClick={Update}>Update</button> : '' } 
    </span> 
}

export function CancelBtn() { 
  const { useedition:{mode, SetEntry, SetMode}, defaultEntry } = useContext(AdminTableContext); 

  const Cancel = () => { 
    SetEntry(); 
    SetMode(); 
  }
  
  
  return <button onClick={Cancel}>Cancel</button> 
}
