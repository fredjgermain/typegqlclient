

// -------------------------------------------------------- 
import React from 'react';
import style from '../../css/main.module.css'; 
import { CrudEntryContext, useCrudEntry, useModelSelector } from '../../libs/crudentry'; 
import { InputSelect } from '../../libs/inputs'; 


export function AdminPage() { 
  const modelsName = ['A', 'B', 'C']; 

  return <div> 

  </div> 
} 


export function ModelSelector({modelsName}:{modelsName:string[]}) { 
  const {modelSelector:{model}, SelectModelArgs} = useModelSelector(modelsName); 
  const {accessor} = model; 

  return <div> 
    <h3>Collection selector</h3> 
    <h4 className={style.instruction}>Select a data collection you wish to read and/or edit.</h4> 
    <InputSelect {...SelectModelArgs} /> 

    <ModelDescriptor {...{model}} />
    <CrudEntryContexter key={accessor} {...{model}}/> 
  </div> 
}


export function ModelDescriptor({model}:{model:IModel}) { 
  return <div></div> 
} 

export function CrudEntryContexter({model}:{model:IModel}) { 
  const context = useCrudEntry({model}); 

  return <CrudEntryContext.Provider value={context}> 
    <CrudEntryEditor/> 
  </CrudEntryContext.Provider> 
} 

export function CrudEntryEditor() { 
  return <div></div> 
} 


