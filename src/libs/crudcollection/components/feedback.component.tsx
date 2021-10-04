import { useContext } from 'react'; 


// --------------------------------------------------------
import { CrudCollectionContext } from '../crudcollection.component'; 
import { ParseCrudError } from '../../dao/dao.utils'; 
import { IsEmpty } from '../../utils'; 


// --------------------------------------------------------
export function CrudFeedback() { 
  const {data:{model:{label}, feedback:{action, success, feedback}}} = useContext(CrudCollectionContext); 


  if(IsEmpty(feedback)) 
    return <div></div> 
  
  if(success) 
    return <CrudFeedback_Success /> 
  return <CrudFeedback_Error /> 
} 


export function CrudFeedback_Success() { 
  const {data:{model:{label}, feedback:{action, success, feedback}}} = useContext(CrudCollectionContext); 

  const pastParticiple = {Create:'created', Read:'read', Update:'updated', Delete:'deleted'} 
  const abbrevs = (feedback as IEntry[]).map( e => e.abbrev); 

  return <div> 
    {label[0]} {JSON.stringify(abbrevs)} has been successfully {pastParticiple[action]} ! 
  </div> 
} 


export function CrudFeedback_Error() { 
  const {data:{model:{label}, feedback:{action, success, feedback}}} = useContext(CrudCollectionContext); 

  const ifErrors = ParseCrudError(feedback); 

  return <div> 
    {action} errors {JSON.stringify(ifErrors)} 
  </div>
}