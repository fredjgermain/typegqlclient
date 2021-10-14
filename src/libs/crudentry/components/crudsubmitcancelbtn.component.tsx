import { useContext } from "react"; 
import { CrudEntryContext } from "../hooks/usecrudentry.hook"; 


export function CrudSubmitCancelBtn() {
  const {crudEntry:{action}, Submit, Cancel} = useContext(CrudEntryContext); 

  return <span> 
      <button onClick={Submit}>{action.toUpperCase()}</button> 
      <button onClick={Cancel}>Cancel</button> 
    </span> 
}