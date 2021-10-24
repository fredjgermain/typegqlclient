import { useContext } from "react"; 


// --------------------------------------------------------
import { Capitalize } from "../../../utils/utils"; 
import { CrudEntryContext } from "../hooks/usecrudentry.hook"; 
import { EnumCrud } from "../../../dao/dao.class";

//import style from '../../../css/main.module.css'; 


export function CrudCreateBtn() { 
  const {SelectEntry} = useContext(CrudEntryContext); 
  return <button onClick={() => SelectEntry({action:EnumCrud.Create})}>Create new entry</button> 
} 


export function CrudConfirmCancelBtn() {
  const {crudEntry:{action}, Submit, Cancel, EntryValidation} = useContext(CrudEntryContext); 
  const valid = EntryValidation(); 

  return <span> 
    <button onClick={Submit} disabled={!valid}>{Capitalize(`Confirm ${action}`)}</button> 
    <button onClick={Cancel}>Cancel</button> 
  </span> 
}