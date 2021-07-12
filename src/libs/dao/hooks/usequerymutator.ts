import { 
  useMutation, 
  useLazyQuery, 
} from "@apollo/client";

// --------------------------------------------------------
import { QUERY_FEEDBACK, QUERY_MODEL, QUERY_READ, QUERY_VALIDATE, MUTATION_CREATE, MUTATION_UPDATE, MUTATION_DELETE } from '../gql'; 


export function useQueryMutator() { 
  return {
    Model: useLazyQuery(QUERY_MODEL), 
    Validate: useLazyQuery(QUERY_VALIDATE), 
    FeedbackMsg: useLazyQuery(QUERY_FEEDBACK), 
    
    Read: useLazyQuery(QUERY_READ), 
    Create: useMutation(MUTATION_CREATE), 
    Update: useMutation(MUTATION_UPDATE), 
    Delete: useMutation(MUTATION_DELETE) 
  }
}
