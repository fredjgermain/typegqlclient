import { Story } from '@storybook/react'; 


// ------------------------------------------------------- 
import { client } from '../../libs/dao/apolloclient'; 
import { CrudCollection } from '../crudcollection/crudcollection.component'; 
import { DaoContexter } from '../dao/daocontexter.component'; 



export default { 
  title: 'CollectionEditor', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  const modelsName = ['A', 'B', 'C']; 

  return <DaoContexter {...{client}} > 
    <CrudCollection {...{modelsName}} /> 
  </DaoContexter> 
} 

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestCollectionEditor = Template.bind({}) 
