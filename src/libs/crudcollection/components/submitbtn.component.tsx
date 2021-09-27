import { useContext } from "react";
import { CrudCollectionContext } from "../crudcollection.component";


export function CrudCollectionSubmitBtn() { 
  const {crud:{mode, entry}, SetCrud, Submit} = useContext(CrudCollectionContext); 

  return <span> 
    <button onClick={Submit}>{mode.toUpperCase()}</button> 
    { (mode==='update' || mode==='delete') 
      && <button onClick={() => SetCrud()}>Cancel</button> } 
  </span> 
}