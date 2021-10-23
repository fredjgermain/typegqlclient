import React, {useContext, useEffect, useState} from 'react'; 
import { DaoContext } from '../../dao/daocontexter.component'; 
import { CrudConfirmCancelBtn, CrudEntryContext, CrudEntryContexter } from '../../react_libs/crudentry';
import { InputScalar } from '../../react_libs/inputs';
import { Filter, IsEmpty} from '../../utils/utils';
import { CrudEntry_FieldEditor } from '../common/crudentry_fieldeditor.component';

// fetch patientModel 
// display Input 
// 


interface IPatient extends IEntry { 
  ramq:string; 
} 

export const PatientContext = React.createContext({} as ReturnType<typeof usePatient>); 
export function usePatient() { 
  const {dao} = useContext(DaoContext); 

  type TPatientEdit = typeof defaultPatientState; 
  const defaultPatientState = { 
    model:{} as IModel, 
    patient: {} as IPatient, 
    patients: [] as IPatient[], 
  } 

  const [patientState, setPatientState] = useState(defaultPatientState); 
  function SetPatientState(newPatientState:Partial<TPatientEdit>) { 
    setPatientState( prev => { return {...prev, ...newPatientState}}) 
  } 

  useEffect(() => { FetchPatientCollection() }, []) 

  async function FetchPatientCollection() { 
    const modelName = 'Patient'; 
    const [model] = await dao.ModelDescriptors({modelsName:[modelName]}); 
    const patients = await dao.Read({modelName, subfields:['_id', 'ramq']}); 
    SetPatientState({model, patients:patients as IPatient[]}) 
  }

  const InputRamq:React.ComponentProps<typeof InputScalar> = { 
    value: patientState.patient.ramq ?? '', 
    SetValue: (newRamq:string) => { 
      const patient = {ramq:newRamq, _id:''} as IPatient; 
      SetPatientState({patient}); 
    }, 
    defaultValue: '', 
    valueType:'string', 
  }

  // Return null if not found 
  function FindPatient() { 
    const {patient} = patientState; 
    return patientState.patients.find( p => p.ramq === patient.ramq ) 
  } 

  return {patientState, InputRamq, FindPatient} 
}


export function PatientPage() { 
  const patientcontext = usePatient(); 
  const {patientState:{model}, FindPatient} = patientcontext; 
  const foundPatient = FindPatient(); 

  return <div> 
    {IsEmpty(model) ? 
      <span>...</span>:
      <PatientContext.Provider value={patientcontext}> 
        {!foundPatient ? 
          <InputRamq/>: 
          <PatientEditor/>} 
      </PatientContext.Provider> } 
  </div> 
} 

function InputRamq() { 
  const {patientState:{model, patients}, InputRamq} = useContext(PatientContext); 
  const ifield = model.ifields.find( f => f.accessor === 'ramq')!; 
  const label = `${ifield.label[0] ?? ifield.accessor} : `; 

  return <div> 
    <div>
      {patients.map( p => {return <div>
        {JSON.stringify(p)} 
      </div>})} 
    </div>
    {label} <InputScalar {...InputRamq} /> 
  </div> 
} 

function PatientEditor() { 
  const {patientState:{model}, FindPatient } = useContext(PatientContext); 
  const entry = FindPatient(); 
  const crudcontext = {model, entry, defaultEntry:entry}; 

  // return <CrudEntryContexter key={entry?.ramq} {...crudcontext} > 
  //   {JSON.stringify(entry)} 
  // </CrudEntryContexter>
  return <CrudEntryContexter key={entry?.ramq} {...crudcontext} > 
    <CrudEntry_PatientEditor/> 
  </CrudEntryContexter> 
} 



function CrudEntry_PatientEditor() { 
  const {crudEntry:{model}} = useContext(CrudEntryContext); 
  //const _idfield = model.ifields.filter( f => f.accessor === '_id') ?? []; 
  
  const ramqIField = model.ifields.find( f => f.accessor === 'ramq')!; 
  const editableIFields = model.ifields.filter( f => f.options?.editable && f.accessor != 'ramq' ); 

  // return <div>
  //   {JSON.stringify(editableIFields)} 
  // </div>

  return <div> 
    <CrudEntry_FieldEditor {...{ifield:ramqIField}} /> 
    {editableIFields.map( (ifield, i) => {return <CrudEntry_FieldEditor key={i} {...{ifield}}/>})} 
    <CrudConfirmCancelBtn/> 
  </div> 
} 