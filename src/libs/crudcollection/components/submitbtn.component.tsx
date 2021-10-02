import { useContext } from "react"; 
import { CrudCollectionContext } from "../crudcollection.component"; 
import { EnumMode } from '../hooks/usecrud.hooks'; 


export function CrudCollectionSubmitBtn({entry}:{entry:IEntry}) { 
  const {status:{mode}, SetStatus, Submit} = useContext(CrudCollectionContext); 

  return <span> 
    <button onClick={() => Submit(entry)}>{mode.toUpperCase()}</button> 
    { (mode=== EnumMode.update || mode=== EnumMode.delete) 
      && <button onClick={() => SetStatus()}>Cancel</button> } 
  </span> 
}