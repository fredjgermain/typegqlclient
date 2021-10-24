import React, {useContext, useEffect, useState} from 'react'; 

// --------------------------------------------------------
import style from '../../css/main.module.css'; 
import { EnumCrud } from '../../dao/dao.class';
import { DaoContext } from '../../dao/daocontexter.component'; 
import { CrudConfirmCancelBtn, CrudEntryContext, CrudEntryContexter, CrudFeedback } from '../../react_libs/crudentry';
import { IsEmpty} from '../../utils/utils'; 
import { CrudEntry_FieldEditor } from '../common/crudentry_fieldeditor.component'; 


// fetch patientModel 
// display Input 
// 


interface IPatient extends IEntry { 
  ramq:string; 
} 

//const PatientContext = React.createContext({} as ReturnType<typeof usePatient>); 
function usePatient() { 
  const {dao} = useContext(DaoContext); 

  type TPatientEdit = typeof defaultPatientState; 
  const defaultPatientState = { 
    model:{} as IModel, 
  } 

  const [patientState, setPatientState] = useState(defaultPatientState); 
  function SetPatientState(newPatientState:Partial<TPatientEdit>) { 
    setPatientState( prev => { return {...prev, ...newPatientState}}) 
  } 

  useEffect(() => { FetchPatientCollection() }, []) 

  async function FetchPatientCollection() { 
    const modelName = 'Patient'; 
    const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
    SetPatientState({model}) 
  } 

  return {patientState, SetPatientState} 
} 



export function PatientPage() { 
  const patientcontext = usePatient(); 
  const {patientState:{model}} = patientcontext; 

  return <div> 
    {!IsEmpty(model) && <PatientEditor {...{model}}/> }
  </div> 
} 

function PatientEditor({model}:{model:IModel}) { 
  //const {patientState:{model}, FindPatient } = useContext(PatientContext); 

  return <div className={style.roundbox}> 
    <CrudEntryContexter {...{model, action:EnumCrud.Create}} > 
      <CrudFeedback/> 
      <hr/> 
      <CrudEntry_PatientEditor/> 
    </CrudEntryContexter> 
  </div>
} 


function CrudEntry_PatientEditor() { 
  const {crudEntry:{model, action, entries}} = useContext(CrudEntryContext); 
  const editableIFields = model.ifields.filter( f => f.options?.editable ); 

  return <div> 
    {entries.map( (entry, i) => { 
      const logout = `${JSON.stringify(entry.ramq)} + ${JSON.stringify(entry.abbrev)}`; 
      return <div key={i}>{logout}</div> 
    })} 
    
    <span>Instruction ... {action} a new profile. </span> <br/> 
    {editableIFields.map( (ifield, i) => {return <CrudEntry_FieldEditor key={i} {...{ifield}}/>})} 
    <CrudConfirmCancelBtn/> 
  </div> 
} 






// export const PatientContext = React.createContext({} as ReturnType<typeof usePatient>); 
// export function usePatient() { 
//   const {dao} = useContext(DaoContext); 

//   type TPatientEdit = typeof defaultPatientState; 
//   const defaultPatientState = { 
//     model:{} as IModel, 
//     patient: {} as IPatient, 
//     patients: [] as IPatient[], 
//   } 

//   const [patientState, setPatientState] = useState(defaultPatientState); 
//   function SetPatientState(newPatientState:Partial<TPatientEdit>) { 
//     setPatientState( prev => { return {...prev, ...newPatientState}}) 
//   } 

//   useEffect(() => { FetchPatientCollection() }, []) 

//   async function FetchPatientCollection() { 
//     const modelName = 'Patient'; 
//     const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
//     const patients = await dao.Read({modelName, subfields:['_id', 'ramq']}); 
//     SetPatientState({model, patients:patients as IPatient[]}) 
//   }

//   const InputRamq:React.ComponentProps<typeof InputScalar> = { 
//     value: patientState.patient.ramq ?? '', 
//     SetValue: (newRamq:string) => { 
//       const patient = {ramq:newRamq, _id:''} as IPatient; 
//       SetPatientState({patient}); 
//     }, 
//     defaultValue: '', 
//     valueType:'string', 
//   }

//   // Return null if not found 
//   async function FindPatient() { 
//     const modelName = 'Patient'; 
//     const {patient} = patientState; 
//     const foundPatient = patientState.patients.find( p => p.ramq === patient.ramq ) 
//     if(foundPatient) { 
//       await dao.Read({modelName, ids:[foundPatient._id]}) 
//         .then(([res]) => { 
//           const patient = res as IPatient; 
//           SetPatientState({patient}) 
//         }); 
//     }
      
//     return 
//   } 

//   return {patientState, InputRamq, FindPatient} 
// }

