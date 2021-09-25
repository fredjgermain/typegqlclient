import { useContext } from "react";
import { CrudCollectionContext } from "./crudcollection.component";


export function CrudCollectionSubmitBtn() { 
  const {crudStatus:{mode, entry}, SetCrudStatus, Submit} = useContext(CrudCollectionContext); 

  return <span> 
    <button onClick={Submit}>{mode.toUpperCase()}</button> 
    { (mode==='update' || mode==='delete') 
      && <button onClick={() => SetCrudStatus()}>Cancel</button> } 
  </span> 
}