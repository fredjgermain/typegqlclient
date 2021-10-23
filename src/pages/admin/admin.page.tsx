// -------------------------------------------------------- 
import style from '../../css/main.module.css'; 
import { CrudEntryContexter, useModelSelector } from '../../react_libs/crudentry'; 

import { ModelDescriptor } from './components/modeldescriptor.component'; 
import { ModelSelector } from './components/modelselector.component'; 
import { CrudEditorSection } from './components/crudentry_editor.component'; 
import { CrudTable } from './components/crudtable.component';


export function AdminPage() { 
  const modelsName = ['A', 'B', 'C']; 
  const usemodelselector = useModelSelector(modelsName); 
  const {modelSelector:{model}} = usemodelselector; 

  return <div>
    <h1>Admin page</h1> <br/> 
    {usemodelselector.modelSelector.model.accessor} 
    <div className={style.roundbox}> 
      <ModelSelector {...{usemodelselector}}/> 
      <CrudEntryContexter key={model.accessor} {...{model}}> 
        <hr/>
        <CrudEditorSection/> 
        <hr/>
        <ModelDescriptor/> 
        <hr/>
        <CrudTable/> 
      </CrudEntryContexter> 
    </div> 
  </div>
} 
