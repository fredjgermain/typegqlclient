import { useContext } from 'react'; 

// -------------------------------------------------------- 
import { InputSelect } from '../../../react_libs/inputs'; 
import { QuestionnaireContext, IQuestion, IAnswerItem } from '../hooks/useQuestionnaire.hook'; 


export function QuestionItem({qid}:{qid:string}) { 
  const {questionnaire:{questions, answers}} = useContext(QuestionnaireContext); 
  const {label, responsegroup} = questions.find( q => q.qid === qid) as IQuestion; 
  const {value} = answers.find( q => q.qid === qid) as IAnswerItem; 

  return <div> 
    [{qid}] {label} : [{value}] 
    <ResponseSelector {...{qid}}/> 
  </div> 
} 



function ResponseSelector({qid}:{qid:string}) { 
  const {questionnaire:{questions, answers}, SetAnswer} = useContext(QuestionnaireContext); 
  const {label, responsegroup:{responsechoices}} = questions.find( q => q.qid === qid) as IQuestion; 
  const {value} = answers.find( q => q.qid === qid) as IAnswerItem; 

  function SetValue(newValue:number) { 
    SetAnswer(qid, newValue); 
  } 
  const options = (responsechoices[0].map( (label:any, value:number) => { 
    return {value, label} as IOption; 
  })); 

  return <div> 
    <InputSelect {...{value, SetValue, options}} /> 
  </div> 
} 