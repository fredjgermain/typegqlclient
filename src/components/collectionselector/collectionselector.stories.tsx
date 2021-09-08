import { useEffect } from 'react'; 
import { Story } from '@storybook/react'; 
import { ApolloProvider } from "@apollo/client"; 


// ------------------------------------------------------- 
import { client } from '../../libs/dao/apolloclient'; 
import { FetchModels } from './collectionselector.component'; 



export default { 
  title: 'DAO/modeldescriptor', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  return <ApolloProvider {...{client}} > 
    <FetchModels/> 
  </ApolloProvider> 
} 

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestDAO = Template.bind({}) 
