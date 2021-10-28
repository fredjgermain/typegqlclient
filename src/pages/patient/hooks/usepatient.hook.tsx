import React, {useContext, useEffect, useState} from 'react'; 

// --------------------------------------------------------
import { DaoContext } from '../../../dao/daocontexter.component'; 

export interface IPatient extends IEntry { 
  ramq:string; 
} 

//const PatientContext = React.createContext({} as ReturnType<typeof usePatient>); 
export function usePatient() { 
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
