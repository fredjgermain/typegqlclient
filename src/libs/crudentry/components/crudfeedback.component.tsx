import { useContext } from 'react'; 


// --------------------------------------------------------
import style from '../../../css/main.module.css'; 
import { ParseCrudError } from '../../dao/dao.utils'; 
import { IsEmpty } from '../../utils'; 
import { CrudEntryContext } from '../hooks/usecrudentry.hook'; 


const pastParticiple = {Create:'created', Read:'read', Update:'updated', Delete:'deleted'} 
// --------------------------------------------------------
export function CrudFeedback() { 
  const {crudEntry:{model:{label}, feedback:{feedback, success}}} = useContext(CrudEntryContext); 

  if(success) 
    return <CrudSuccess /> 
  if(!IsEmpty(feedback)) 
    return <CrudError /> 
  return <div></div> 
} 



function CrudSuccess() { 
  const {crudEntry:{model, feedback:{action}}} = useContext(CrudEntryContext); 
  const {label} = model; 

  return <em className={style.success}> 
    {label[0]} has been successfully {pastParticiple[action]} ! 
  </em> 
} 



function CrudError() { 
  const {crudEntry:{model:{label}, feedback:{action, feedback}}} = useContext(CrudEntryContext); 

  const errors = ParseCrudError(feedback) as any[]; 

  return <div> 
    <em className={style.error}>{label[0]} has failed to {action} ! <br/> </em> 
    <ul className={style.error}> 
      {errors.map( (error,i) => { 
        return <li key={i} >{JSON.stringify(error)}</li> 
      })} 
    </ul> 
  </div> 
}