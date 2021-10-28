
// --------------------------------------------------------
import style from '../../css/main.module.css'; 
import { EnumCrud } from '../../dao/dao.class';
import { CrudEntryContexter, CrudFeedback } from '../../react_libs/crudentry';
import { CrudEntry_PatientEditor } from './components/crudentry_patienteditor.component';

import { IPatient, usePatient } from './hooks/usepatient.hook'; 


export function PatientPage() { 
  const patientcontext = usePatient(); 
  const {patientState:{model}} = patientcontext; 

  return <CrudEntryContexter {...{model, action:EnumCrud.Create}} > 
      <div className={style.roundbox}> 
        <CrudFeedback/> 
        <hr/> 
        <CrudEntry_PatientEditor/> 
      </div>
    </CrudEntryContexter> 
} 
