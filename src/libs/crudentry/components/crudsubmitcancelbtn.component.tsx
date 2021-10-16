import { useContext } from "react"; 
import { EnumCrud } from "../../dao/dao.class";


// --------------------------------------------------------
import { Capitalize } from "../../utils";
import { CrudEntryContext } from "../hooks/usecrudentry.hook"; 


export function CrudCreateBtn() { 
  const {crudEntry:{defaultEntry}, SelectEntry} = useContext(CrudEntryContext); 
  return <button onClick={() => SelectEntry({entry:defaultEntry, action:EnumCrud.Create})}>Create new entry</button> 
} 


export function CrudConfirmCancelBtn() {
  const {crudEntry:{action}, Submit, Cancel} = useContext(CrudEntryContext); 

  return <span> 
      <button onClick={Submit}>{Capitalize(`Confirm ${action}`)}</button> 
      <button onClick={Cancel}>Cancel</button> 
    </span> 
}