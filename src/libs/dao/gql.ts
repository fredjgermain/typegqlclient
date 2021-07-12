import { gql } from "@apollo/client"; 

export const QUERY_MODEL = gql` 
query Model($modelName: String!) { 
  Model(modelName:$modelName) 
}` 

export const QUERY_VALIDATE = gql` 
query Validate($inputs:[ObjectScalar!]!, $modelName: String!) { 
  Validate(inputs:$inputs, modelName:$modelName) 
}` 

export const QUERY_FEEDBACK = gql` 
query FeedbackMsg($feedbackNames: [String!]!) { 
  FeedbackMsg(feedbackNames:$feedbackNames) 
}` 

export const MUTATION_CREATE = gql` 
mutation Create($inputs:[ObjectScalar!]!, $modelName: String!) { 
  Create(inputs:$inputs, modelName:$modelName) 
}` 

export const QUERY_READ = gql` 
query Read($ids: [ID!], $modelName: String!) { 
  Read(ids:$ids, modelName:$modelName) 
}` 

export const MUTATION_UPDATE = gql` 
mutation Update($inputs:[ObjectScalar!]!, $modelName: String!) { 
  Update(inputs:$inputs, modelName:$modelName) 
}` 

export const MUTATION_DELETE = gql` 
mutation Delete($ids: [ID!], $modelName: String!) { 
  Delete(ids:$ids, modelName:$modelName) 
}` 