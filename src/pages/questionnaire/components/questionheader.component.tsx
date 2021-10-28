// -------------------------------------------------------- 
import { IQuestion } from '../hooks/useQuestionnaire.hook';



export function QuestionnaireHeader({question}:{question:IQuestion}) { 
  const {form, instructions} = question; 

  return <div>
    <h3>Form: {form?.title}</h3> 
    <h4>Instructions: </h4> 
    <ul>
      {instructions.map( (instruction, i) => { 
        return <li key={i}>{instruction?.label ?? ''}</li> 
      })} 
    </ul> 
  </div> 
} 

