import { Story } from '@storybook/react'; 
import React, { useContext } from 'react';

// ------------------------------------------------------- 
import { client } from '../../libs/dao/apolloclient'; 
import { DaoContexter } from '../dao/daocontexter.component'; 

import style from '../../css/main.module.css'; 
import { InputSelect } from '../inputs'; 
import { CrudEditor, CrudEntryContexter, 
  CrudFeedback, CrudTable, useModelSelector, CrudEntryContext } 
  from '../crudentry'; 


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
  const {accessor, label} = model; 

  return <div> 
    <div> 
      <h3>Collection selector</h3> 
      <h4 className={style.instruction}>Select a data collection you wish to read and/or edit.</h4> 
      <InputSelect {...SelectModelArgs} /> 
    </div> 

    {<CrudEntryContexter key={accessor} {...{model}}> 
      <hr/> 
      <ModelDescriptor {...{model}}/> 
      <div className={style.roundbox}> 
        <h3>Entry editor</h3> 
        <ul className={style.instruction}> 
          <li>Use the "Create" button to create and add a new entry in <em>{label}</em>.</li> 
          <li>Use "Update" and "Delete" buttons on the right end side of the table below either Update or Delete the corresponding entry from <em>{label}</em>.</li> 
          <li>Use either the "Confirm" "Create, Update, Delete" button below to confirm the creation, update, or deletion of the corresponding entry. </li>
        </ul> 

        <hr/> 
        <CrudFeedback/> 
        <hr/> 
        <CrudEditor/> 
      </div> 
      <div className={style.roundbox}> 
        <h3>Collection reader for {label}</h3> 
        <CrudTable/> 
      </div> 
      <FunctionAsChildTest> 
        { (value:any) => { 
          return <div>{JSON.stringify(value)}</div> 
        }} 
      </FunctionAsChildTest> 
    </CrudEntryContexter>} 
  </div> 
} 

function ModelDescriptor({model}:{model:IModel}) { 
  const {label, description} = model; 
  return <div> 
    <h3>{label}</h3> 
    <p><em>Description:</em>{description}</p> 
  </div> 
} 

function FunctionAsChildTest({children}:{children:Function}) { 
  const childrenFunc = children; 
  const context = useContext(CrudEntryContext); 

  return <div> 
    {childrenFunc(context)} 
  </div> 
}

const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestCrudEntry = Template.bind({}) 
