import { useContext } from "react"; 
import { CrudEntryContext } from "../hooks/usecollectionselector.hook"; 
//import { CrudEntryContext, CrudEntryEditor } from "./crudentryeditor.component"; 


export function CrudCollectionSubmitBtn() { 
  const {crudEntry:{action}, Submit, Cancel } = useContext(CrudEntryContext); 

  return <span> 
    <button onClick={Submit}>{action.toUpperCase()}</button> 
    <button onClick={Cancel}>Cancel</button> 
  </span> 
} 
