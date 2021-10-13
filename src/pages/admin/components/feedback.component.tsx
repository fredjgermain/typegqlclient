import { useContext } from 'react'; 


// --------------------------------------------------------
import { ParseCrudError } from '../../dao/dao.utils'; 
import { IsEmpty, Label } from '../../utils';
import { CrudEntryContext } from '../hooks/usecrudentry.hook';
import { ModelSelectorContext } from '../hooks/usemodelselector.hook';



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



export function CrudFeedback_Success() { 
  const {modelData:{model}} = useContext(ModelSelectorContext); 
  const {label} = model; 
  const {crudEntry:{feedback:{action, feedback}}} = useContext(CrudEntryContext); 
  //const abbrevs = (feedback as IEntry[]).map( e => e.abbrev); 

  return <div> 
    {label[0]} has been successfully {pastParticiple[action]} ! 
  </div> 
} 



export function CrudFeedback_Error() { 
  const {modelData:{model:{label}}} = useContext(ModelSelectorContext); 
  const {crudEntry:{feedback:{action, feedback}}} = useContext(CrudEntryContext); 

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