import { Story } from '@storybook/react'; 


// ------------------------------------------------------- 
import { client } from '../../libs/dao/apolloclient'; 
import { AdminPage } from '../admin/admin.page'; 
import { DaoContexter } from '../../libs/dao/daocontexter.component';



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
