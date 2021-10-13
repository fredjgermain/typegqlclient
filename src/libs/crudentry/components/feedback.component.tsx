import { useContext } from 'react'; 


// --------------------------------------------------------
import { ParseCrudError } from '../../dao/dao.utils'; 
import { IsEmpty } from '../../utils'; 
import { CrudEntryContext } from '../hooks/usecrudentry.hook'; 


const pastParticiple = {Create:'created', Read:'read', Update:'updated', Delete:'deleted'} 
// --------------------------------------------------------
export function CrudFeedback() { 
  const {crudEntry:{feedback:{feedback, success}}} = useContext(CrudEntryContext); 

  
  if(success) 
    return <CrudFeedback_Success /> 
  if(!IsEmpty(feedback)) 
    return <CrudFeedback_Error /> 
  return <div></div> 
} 



function CrudFeedback_Success() { 
  const {crudEntry:{model, feedback:{action}}} = useContext(CrudEntryContext); 
  const {label} = model; 

  return <div> 
    {label[0]} has been successfully {pastParticiple[action]} ! 
  </div> 
} 



function CrudFeedback_Error() { 
  const {crudEntry:{model:{label}, feedback:{action, feedback}}} = useContext(CrudEntryContext); 

  const errors = ParseCrudError(feedback) as any[]; 

  return <div> 
    {label[0]} has failed to {action} ! <br/> 
    Errors: <ul> 
      {errors.map( (error,i) => { 
        return <li key={i} >{JSON.stringify(error)}</li> 
      })} 
    </ul>
  </div>
}