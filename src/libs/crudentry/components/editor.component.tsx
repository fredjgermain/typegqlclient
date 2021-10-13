import { useContext } from "react";
import { EntryEditor } from "../../entryreadereditor/entryeditor.component";
import { CrudEntryContext } from "../hooks/usecrudentry.hook";

export function CrudEditor() { 
  const {crudEntry:{model:{ifields}, entry, ifieldsOptions}, SetEntry} = useContext(CrudEntryContext); 
  return <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
} 