import { useContext } from "react"; 
import { CrudCollectionContext } from "../crudcollection.component"; 
import { EnumMode } from '../hooks/crudcollection.hooks'; 


export function CrudCollectionSubmitBtn() { 
  const {crud:{mode}, SetCrud, Submit} = useContext(CrudCollectionContext); 

  return <span> 
    <button onClick={Submit}>{mode.toUpperCase()}</button> 
    { (mode=== EnumMode.update || mode=== EnumMode.delete) 
      && <button onClick={() => SetCrud()}>Cancel</button> } 
  </span> 
}