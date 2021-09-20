import { useContext } from 'react'; 


// ----------------------------------------------------------- 
import { EditEntry } from '../../../libs/editor/editfield.component';
import { IsEmpty } from '../../../libs/utils';
import { AdminTableContext } from './admintable.component';
import { CancelBtn, SubmitBtn } from './editionbtn.component';


/** Editor 
 * 
 * @returns 
 */
export function Editor() { 
  const {model, ifieldsOptions, useedition} = useContext(AdminTableContext); 
  const {entry, SetEntry} = useedition; 
  const ifields = model.ifields.filter( f => !f.accessor.includes('_') ); 
  const label = model.label; 

  //console.log(ifields); 

  return <div> 
    <h4>{label[0]}</h4> 
    { !IsEmpty(entry) && <EditEntry {...{entry, SetEntry, ifields, ifieldsOptions}} /> } 
    <SubmitBtn/><CancelBtn/> 
  </div> 
}


