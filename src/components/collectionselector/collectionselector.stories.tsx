import { useEffect } from 'react'; 
import { Story } from '@storybook/react'; 
import { ApolloProvider } from "@apollo/client"; 


// ------------------------------------------------------- 
import { client } from '../../apolloclient'; 
import { FetchModelDescriptors } from './collectionselector.component'; 



export default { 
  title: 'DAO/modeldescriptor', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  return <ApolloProvider {...{client}} > 
    <FetchModelDescriptors/> 
  </ApolloProvider> 
} 

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestDAO = Template.bind({}) 
