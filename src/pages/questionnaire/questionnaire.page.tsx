import React, { useContext, useState, useEffect } from 'react'; 

// -------------------------------------------------------- 
import { DaoContext } from '../../dao/daocontexter.component'; 
import { Group, Predicate } from '../../utils/utils'; 



/*
Need patient ? 
*/

interface IAnswer extends IEntry { 
  patient: IEntry, 
  question: IEntry, 
  date: Date, 
  answervalues: number, 
} 

function useQuestionnaire({patient}:{patient:IEntry}) { 
  const {dao} = useContext(DaoContext); 

  type TQuestionnaire = typeof defaultQuestionnaire; 
  const defaultQuestionnaire = { 
    answers: [] as IAnswer[], 
  } 
  const [questionnaire, setQuestionnaire] = useState(defaultQuestionnaire); 
  function SetQuestionnaire({newQuestionnaire}:{newQuestionnaire:Partial<TQuestionnaire>}) { 
    setQuestionnaire( prev => {return {...prev, ...newQuestionnaire}}) 
  } 

  async function FetchSubfields(modelName:string) { 
    const {fields} = await dao.TypeIntrospection(modelName); 
    return fields.map( field => field.name ) 
  } 

  async function FetchQuestionnaire() { 
    // const forms = await dao.Read({modelName:'Form'}); 
    // const instructions = await dao.Read({modelName:'Instruction'}); 
    const formSubfields = await FetchSubfields('Form'); 
    const instructionSubfields = await FetchSubfields('Instruction'); 
    const responsesSubfields = await FetchSubfields('ResponseGroup'); 
    const questionsubfields = await FetchSubfields('Question'); 

    const questions = await dao.Read({modelName:'Question'}); 
    const date = new Date(); 
    const answers = questions.map( question => { 
      return { date, patient, question } as IAnswer; 
    }) 

    const groupingPredicate = {} as Predicate<IEntry>; 
    const pages = Group(questions, groupingPredicate); 

    console.log(questionsubfields, formSubfields, instructionSubfields, responsesSubfields); 
    console.log(questions); 
  } 

  useEffect(() => { FetchQuestionnaire() }, []) 

  return {questionnaire, SetQuestionnaire} 
} 

export function QuestionnairePage() { 
  const patient = {} as IEntry; 
  const context = useQuestionnaire({patient}); 

  return <div> 

  </div>
} 