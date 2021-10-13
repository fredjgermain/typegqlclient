import { Story } from '@storybook/react'; 


// ------------------------------------------------------- 
import { client } from '../../libs/dao/apolloclient'; 
import { CrudEntry } from '../crudentry/crudentry.component';

import { DaoContexter } from '../dao/daocontexter.component'; 
import { InputSelect } from '../inputs';
import { useModelSelector } from '../crudentry'; 



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
    {<CrudEntry {...{model}}> 

      {JSON.stringify(model)} 
    </CrudEntry>} 
  </div> 
} 

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestCrudEntry = Template.bind({}) 
