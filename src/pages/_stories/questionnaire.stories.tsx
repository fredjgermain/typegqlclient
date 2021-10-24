import { Story } from '@storybook/react'; 


// ------------------------------------------------------- 
import { client } from '../../dao/apolloclient'; 
import { DaoContexter } from '../../dao/daocontexter.component';
import { QuestionnairePage } from '../questionnaire/questionnaire.page';



export default { 
  title: 'QuestionnairePage', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  return <DaoContexter {...{client}} > 
    <QuestionnairePage/> 
  </DaoContexter> 
} 


const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestQuestionnairePage = Template.bind({}) 
