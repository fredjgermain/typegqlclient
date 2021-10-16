import React, { useContext } from 'react'; 

// -------------------------------------------------------- 
import style from '../../css/main.module.css'; 
import { CrudEntryContexter, CrudTable, 
  useModelSelector } from '../../libs/crudentry'; 

import { ModelDescriptor } from './components/modeldescriptor.component'; 
import { ModelSelector } from './components/modelselector.component'; 
import { CrudEditor } from './components/crudeditor.component'; 



export function AdminPage() { 
  const modelsName = ['A', 'B', 'C']; 
  const usemodelselector = useModelSelector(modelsName); 
  const {modelSelector:{model}} = usemodelselector; 

  return <div className={style.roundbox}> 
    <ModelSelector {...{usemodelselector}}/> 
    <CrudEntryContexter key={model.accessor} {...{model}}> 
      <hr/>
      <ModelDescriptor/> 
      <hr/>
      <CrudEditor/> 
      <hr/>
      <CrudTable/> 
    </CrudEntryContexter> 
  </div> 
} 
