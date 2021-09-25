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
  const modelName = 'Patient'; 

  return <DaoContexter {...{client}} > 
    <CrudCollection {...{modelName}} /> 
  </DaoContexter> 
} 

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestCollectionEditor = Template.bind({}) 
