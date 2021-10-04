import { useContext } from 'react'; 


// --------------------------------------------------------
import { CrudCollectionContext } from '../crudcollection.component'; 
import { ParseCrudError } from '../../dao/dao.utils'; 
import { IsEmpty } from '../../utils'; 



const pastParticiple = {Create:'created', Read:'read', Update:'updated', Delete:'deleted'} 
// --------------------------------------------------------
export function CrudFeedback() { 
  const {data:{feedback:{success, feedback}}} = useContext(CrudCollectionContext); 

  if(IsEmpty(feedback)) 
    return <div></div> 
  
  if(success) 
    return <CrudFeedback_Success /> 
  return <CrudFeedback_Error /> 
} 


export function CrudFeedback_Success() { 
  const {data:{model:{label}, feedback:{action, feedback}}} = useContext(CrudCollectionContext); 
  const abbrevs = (feedback as IEntry[]).map( e => e.abbrev); 

  return <div> 
    {label[0]} {JSON.stringify(abbrevs)} has been successfully {pastParticiple[action]} ! 
  </div> 
} 


export function CrudFeedback_Error() { 
  const {data:{model:{label}, feedback:{action, feedback}}} = useContext(CrudCollectionContext); 

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