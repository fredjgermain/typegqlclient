import { Story } from '@storybook/react'; 
import { ApolloProvider } from "@apollo/client"; 


// ------------------------------------------------------- 
import { client } from '../../../apolloclient'; 
import { AdminPage } from '../admin.page'; 



export default { 
  title: 'AdminPage', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  return <ApolloProvider {...{client}} > 
    <AdminPage/> 
  </ApolloProvider> 
} 

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestAdminPage = Template.bind({}) 
