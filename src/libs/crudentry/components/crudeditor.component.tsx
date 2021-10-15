import { useContext } from "react";

// --------------------------------------------------------
import style from '../../../css/main.module.css'; 
import { EnumCrud } from "../../dao/dao.class"; 
import { EntryEditor } from "../../entryreadereditor/entryeditor.component"; 
import { CrudEntryContext } from "../hooks/usecrudentry.hook"; 
import { SubmitCancelBtn } from '../../crudentry'; 

export function CrudEditor() { 
  const {crudEntry:{action, model:{ifields}, entry, ifieldsOptions, defaultEntry}, SetEntry, SelectEntry} = useContext(CrudEntryContext); 

  return <div> 
    {action === EnumCrud.Read ? 
      <button onClick={() => SelectEntry({entry:defaultEntry, action:EnumCrud.Create})}>Create new entry</button>: 
      <div>
        <h4>{action}</h4> 
        <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
        <SubmitCancelBtn/> 
      </div>
      } 
  </div> 
} 