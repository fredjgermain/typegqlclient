import React, { useContext, useState, useEffect } from 'react'; 

// -------------------------------------------------------- 
import { DaoContext } from '../../../dao/daocontexter.component'; 
import { Predicate, ReduceToString } from '../../../utils/utils'; 
import { usePager } from '../../../react_libs/pager';



export interface IAnswerItem { 
  qid:string, 
  value:number 
} 

export interface IAnswer extends IEntry { 
  patient: IEntry, 
  date: Date, 
  answers: IAnswerItem[]; 
} 

export interface IQuestion extends IEntry { 
  qid: string, 
  label: string|string[], 
  form: IEntry, 
  instructions: IEntry[], 
  responsegroup: IResponseGroup, 
  optional: boolean, 
} 

export interface IResponseGroup extends IEntry { 
  responsechoices: string[][]; 
}



export const QuestionnaireContext = React.createContext({} as ReturnType<typeof useQuestionnaire>); 
export function useQuestionnaire({patient}:{patient:IEntry}) { 
  const {dao} = useContext(DaoContext); 

  type TQuestionnaire = typeof defaultQuestionnaire; 
  const defaultQuestionnaire = { 
    date: new Date(), 
    patient: patient, 
    questions: [] as IQuestion[], 
    answers: [] as IAnswerItem[], 
  } 

  // Questionnaire 
  const [questionnaire, setQuestionnaire] = useState(defaultQuestionnaire); 
  function SetQuestionnaire(newQuestionnaire:Partial<TQuestionnaire>) { 
    setQuestionnaire( prev => { return {...prev, ...newQuestionnaire } }) 
  } 

  function SetAnswer(qid:string, newValue:number) { 
    let answersCopy = [...questionnaire.answers]; 
    const at = answersCopy.findIndex( a => a.qid === qid ) 
    if(at >= 0 && newValue != answersCopy[at].value) { 
      answersCopy[at].value = newValue; 
      SetQuestionnaire({answers:answersCopy}) 
    } 
  } 

  // Page Break 
  const PageBreak:Predicate<IQuestion> = ({t:question, array, positive}) => { 
    return ReduceFormIdInstructionIds(question) === ReduceFormIdInstructionIds(array[0]) && positive.length < 4; 
  } 
  const pager = usePager(questionnaire.questions, PageBreak); 


  /* form:{_id, title}, 
    instructions:{_id, label}, 
    responsegroup:{_id, responsechoices} */ 
  async function FetchQuestionnaireSubfields() { 
    const {fields} = await dao.TypeIntrospection('Question'); 
    const questionsubfields = fields.map( field => field.name ); 
    return questionsubfields.map( subfield => { 
      if(subfield === 'form') 
        return "form{_id, title}"; 
      if(subfield === 'instructions') 
        return "instructions{_id, label}"; 
      if(subfield === 'responsegroup') 
        return "responsegroup{_id, responsechoices}"; 
      return subfield; 
    }) 
  } 

  function ReduceFormIdInstructionIds(question:IQuestion) { 
    return `${question.form._id} ${ReduceToString(question.instructions.map( i => i._id ))}`; 
  } 

  async function FetchQuestionnaire() { 
    const subfields = await FetchQuestionnaireSubfields(); 
    const questions = (await dao.Read({modelName:'Question', subfields})) as IQuestion[]; 
    const answers = questions.map( ({qid}) => {return {qid, value:-1}} ) as IAnswerItem[]; 
    SetQuestionnaire({questions, answers}); 
  } 
  
  useEffect(() => { FetchQuestionnaire() }, []); 

  // Submit answers at the end 
  async function SubmitAnswers() { 
    const {date, patient, answers} = questionnaire; 
    const inputs = [{_id:'', date, patient, answers}]; 
    await dao.Create({modelName:'Answer', inputs}) 
      .then( res => res ) 
      .catch( err => err ); 
  } 

  function ValidateAnswers(qids?:string[]) { 
    const answers = qids ? 
      questionnaire.answers.filter( a => qids.includes(a.qid) ): 
      questionnaire.answers; 

    return answers.map( ({qid,value}) => { 
      const question = questionnaire.questions.find( q => q.qid === qid ); 
      if( question && !question.optional && value < 0) 
        return false; 
      return true; 
    }).every( v => v ); 
  } 

  return {questionnaire, SetQuestionnaire, SetAnswer, pager, ValidateAnswers, SubmitAnswers} 
} 