

// -------------------------------------------------------- 
import style from '../../../css/main.module.css'; 
import { useModelSelector } from '../../../libs/crudentry'; 

import { InputSelect } from '../../../libs/inputs'; 


export function ModelSelector({usemodelselector}:{usemodelselector:ReturnType<typeof useModelSelector>}) { 
  const {SelectModelArgs} = usemodelselector; 

  return <div>
    <h3>Collection selector</h3> 
    <p className={style.instruction}>Select a data collection you wish to read and/or edit.</p> 
    <InputSelect {...SelectModelArgs} /> 
  </div>
}