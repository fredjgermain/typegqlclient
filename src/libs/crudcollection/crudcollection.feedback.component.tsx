import { useContext } from 'react'; 



// --------------------------------------------------------
import { CrudCollectionContext } from './crudcollection.component'; 



// --------------------------------------------------------
export function CrudFeedback() { 
  const {crudStatus:{feedback}} = useContext(CrudCollectionContext); 

  return <div>
      FEEDBACK <br/>
      {JSON.stringify(feedback)} 
    </div>
} 