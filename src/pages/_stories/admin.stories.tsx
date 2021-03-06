import { Story } from '@storybook/react'; 


// ------------------------------------------------------- 
import { client } from '../../dao/apolloclient'; 
import { AdminPage } from '../admin/admin.page'; 
import { DaoContexter } from '../../dao/daocontexter.component';



export default { 
  title: 'AdminPage', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  return <DaoContexter {...{client}} > 
    <AdminPage/> 
  </DaoContexter> 
} 


const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestAdminPage = Template.bind({}) 
