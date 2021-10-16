import { useContext } from "react"; 
import { EnumCrud } from "../../dao/dao.class";


// --------------------------------------------------------
import { Capitalize } from "../../utils"; 
import { CrudEntryContext } from "../hooks/usecrudentry.hook"; 


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