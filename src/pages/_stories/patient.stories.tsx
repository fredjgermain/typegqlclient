import { Story } from '@storybook/react'; 


// ------------------------------------------------------- 
import { client } from '../../dao/apolloclient'; 
import { DaoContexter } from '../../dao/daocontexter.component';
import { PatientPage } from '../patient/patient.page';



export default { 
  title: 'PatientPage', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  return <DaoContexter {...{client}} > 
    <PatientPage/> 
  </DaoContexter> 
} 


const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestPatientPage = Template.bind({}) 
