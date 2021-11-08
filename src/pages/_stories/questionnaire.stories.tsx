import { Story } from '@storybook/react'; 
import { useContext, useEffect, useState } from 'react';


// ------------------------------------------------------- 
import { client } from '../../dao/apolloclient'; 
import { DaoContext, DaoContexter } from '../../dao/daocontexter.component';
import { IsEmpty } from '../../utils/utils'; 
import { QuestionnairePage } from '../questionnaire/questionnaire.page';



export default { 
  title: 'QuestionnairePage', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 

  return <DaoContexter {...{client}} > 
    <TestQuestionnairePage/> 
  </DaoContexter>
  
} 

function TestQuestionnairePage() { 
  const {dao} = useContext(DaoContext); 
  const [patient, setPatient] = useState<IEntry>({} as IEntry); 

  async function FetchPatient() { 
    await dao.Read({modelName:"Patient"}) 
    .then( ([res]) => {setPatient(res)}); 
  } 

  useEffect(()=>{ FetchPatient() }, []) 

  if(!IsEmpty(patient)) 
    return <QuestionnairePage {...{patient}}/> 
  return <div></div>
}


const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const QuestionnaireStory = Template.bind({}) 
