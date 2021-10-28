// -------------------------------------------------------- 
import { useContext } from 'react'; 
import { PageOfPages, PagerBtns } from '../../react_libs/pager'; 
import { QuestionnaireHeader } from './components/questionheader.component'; 
import { QuestionItem } from './components/questionitem.component'; 
import { QuestionnaireContext, useQuestionnaire, IAnswer, IQuestion } from './hooks/useQuestionnaire.hook'; 



export function QuestionnairePage() { 
  const patient = {} as IEntry; 
  const context = useQuestionnaire({patient}); 
  const {pager, ValidateAnswers} = context; 
  const items = pager.page; 
  const question = items[0]; 

  const valid = ValidateAnswers(); 
  
  return <QuestionnaireContext.Provider value={context}> 
    {question && <QuestionnaireHeader {...{question}} /> } 
    {items.map( ({qid}) => { 
      return <QuestionItem key={qid} {...{qid}} /> 
    })} 
    <PageOfPages {...pager}/> 
    <div>
      {pager.pageIndex > 0 && <PrevPageBtn /> } 
      {pager.pageIndex < pager.pages.length && <NextPageBtn /> } 
      {valid && <SubmitAnswersBtn /> } 
    </div>
    <PagerBtns {...pager}/> 
  </QuestionnaireContext.Provider> 
} 


export function SubmitAnswersBtn() {
  const {ValidateAnswers, SubmitAnswers} = useContext(QuestionnaireContext); 
  
  const valid = ValidateAnswers(); 

  if(valid) 
    return <button onClick={SubmitAnswers} disabled={!valid}>Submit answers</button> 
  return <span></span> 
}


export function PrevPageBtn () { 
  const {pager} = useContext(QuestionnaireContext); 

  function PrevPage() { pager.SetPageIndex(pager.pageIndex--); }

  return <button onClick={PrevPage} >Previous page</button>
}


export function NextPageBtn () { 
  const {pager, ValidateAnswers} = useContext(QuestionnaireContext); 
  const page = pager.page as IQuestion[]; 

  const pageValid = ValidateAnswers(page.map( q => q.qid )); 

  function NextPage() { pager.SetPageIndex(pager.pageIndex++); }

  return <button onClick={NextPage} disabled={!pageValid}>Next page</button> 
}