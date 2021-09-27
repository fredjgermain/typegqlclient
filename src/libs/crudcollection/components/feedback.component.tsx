import { useContext } from 'react'; 



// --------------------------------------------------------
import { CrudCollectionContext } from '../crudcollection.component'; 



// --------------------------------------------------------
export function CrudFeedback() { 
  const {crud:{feedback}} = useContext(CrudCollectionContext); 

  return <div>
      FEEDBACK <br/>
      {JSON.stringify(feedback)} 
    </div>
} 