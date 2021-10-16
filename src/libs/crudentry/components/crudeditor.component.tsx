import React, { useContext } from "react";

// --------------------------------------------------------
import { EnumCrud } from "../../dao/dao.class"; 
import { EntryEditor } from "../../entryreadereditor/entryeditor.component"; 
import { CrudEntryContext } from "../hooks/usecrudentry.hook"; 
import { CrudConfirmCancelBtn, CrudCreateBtn } from '../../crudentry'; 


// With Context.Consumer
export function CrudEditor() { 
  //const {crudEntry:{action, model:{ifields}, entry, ifieldsOptions}, SetEntry} = useContext(CrudEntryContext); 

  return <CrudEntryContext.Consumer> 
    {value => {
      const {crudEntry:{action, model:{ifields}, entry, ifieldsOptions}, SetEntry} = value; 
      return <div>
        {action === EnumCrud.Read ? 
        <CrudCreateBtn/> : 
        <div> 
          <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
          <CrudConfirmCancelBtn/> 
        </div>} 
      </div> 
    }} 
  </CrudEntryContext.Consumer>
} 

// With useContext
// export function CrudEditor() { 
//   const {crudEntry:{action, model:{ifields}, entry, ifieldsOptions}, SetEntry} = useContext(CrudEntryContext); 

//   return <div> 
//     {action === EnumCrud.Read ? 
//       <CrudCreateBtn/> : 
//       <div>
//         <EntryEditor {...{entry, SetEntry, ifields, ifieldsOptions}} /> 
//         <CrudConfirmCancelBtn/> 
//       </div>} 
//   </div> 
// } 
