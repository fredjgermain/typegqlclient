import { useContext } from 'react'; 



// --------------------------------------------------------
import { CrudCollectionContext } from '../crudcollection.component'; 



// --------------------------------------------------------
export function CrudFeedback() { 
  const {status:{success, feedback}} = useContext(CrudCollectionContext); 
  
  // SUCCESS
  if(success) { 
    if(Array.isArray(feedback)) 
      return <div> 
        FEEDBACK <br/> 
        {} 
      </div> 
  }
    

  //console.log(Object.keys(feedback[0])); 

  return <div>
      FEEDBACK <br/>
      {JSON.stringify(feedback)} 
    </div>
} 