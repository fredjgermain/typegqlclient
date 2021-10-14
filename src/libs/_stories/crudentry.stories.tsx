import { Story } from '@storybook/react'; 


// ------------------------------------------------------- 
import { client } from '../../libs/dao/apolloclient'; 

import { DaoContexter } from '../dao/daocontexter.component'; 
import { InputSelect } from '../inputs'; 
import { CrudEditor, CrudEntry, CrudFeedback, CrudTable, SubmitCancelBtn, useModelSelector } from '../crudentry'; 



export default { 
  title: 'CrudEntry', 
  component: TemplateComponent, 
} 

function TemplateComponent() { 
  return <DaoContexter {...{client}} > 
    <ModelSelector/> 
  </DaoContexter> 
} 

function ModelSelector() { 
  const modelsName = ['A', 'B', 'C']; 
  const {modelSelector:{model}, SelectModelArgs} = useModelSelector(modelsName); 

  return <div> 
    <InputSelect {...SelectModelArgs} /> <br/> 
    {<CrudEntry key={model.accessor} {...{model}}> 
      <h4>{JSON.stringify(model.accessor)}</h4> 
      <CrudFeedback/> 
      <CrudEditor/> 
      <SubmitCancelBtn/> 
      <CrudTable/> 
    </CrudEntry>} 
  </div> 
} 

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestCrudEntry = Template.bind({}) 
