import { useContext } from "react"; 
import { CrudCollectionContext } from "../crudcollection.component"; 
import { CrudEntryContext } from "./crudentryeditor.component";


export function CrudCollectionSubmitBtn() { 
  const {data:{mode}} = useContext(CrudCollectionContext); 
  const {Submit, Cancel} = useContext(CrudEntryContext); 

  return <span> 
    <button onClick={Submit}>{mode.toUpperCase()}</button> 
    <button onClick={Cancel}>Cancel</button> 
  </span> 
  return <div></div>
}