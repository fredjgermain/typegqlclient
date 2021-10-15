import { useContext } from "react"; 
import { Capitalize } from "../../utils";
import { CrudEntryContext } from "../hooks/usecrudentry.hook"; 


export function CrudConfirmCancelBtn() {
  const {crudEntry:{action}, Submit, Cancel} = useContext(CrudEntryContext); 

  return <span> 
      <button onClick={Submit}>{Capitalize(`Confirm ${action}`)}</button> 
      <button onClick={Cancel}>Cancel</button> 
    </span> 
}