import { gql } from "@apollo/client"; 

/*

type CrudResult {
  count: Float!
  errors: [ObjectScalar!]
  items: [ObjectScalar!]!
  modelName: String!
}

type GQLModel {
  accessor: String!
  description: [String!]!
  errors: [ObjectScalar!]
  ifields: [ObjectScalar!]!
  label: [String!]!
}

type Mutation {
  Create(fields: [String!], inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
  Delete(fields: [String!], ids: [ID!], modelName: String!): CrudResult!
  Update(fields: [String!], inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
}

"""Simulates Object"""
scalar ObjectScalar

type Query {
  FeedbackMsg(names: [String!]!): [ObjectScalar!]!
  MLangLabel(names: [String!]!): [ObjectScalar!]!
  Model(modelName: String!): GQLModel!
  Read(fields: [String!], ids: [ID!], modelName: String!): CrudResult!
  Validate(inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
}
*/

export const TEST = gql`
  query Test($modelName:String!) {
    Test(modelName:$modelName) 
  }
`

// Model(modelName: String!): GQLModel! 
export const MODEL = gql` 
  query Model($modelName: String!) { 
    Model(modelName:$modelName) {model} 
  }` 

// Validate(inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
export const VALIDATE = gql` 
  query Validate($inputs: [ObjectScalar!]!, $modelName: String!) { 
    Validate(inputs:$inputs, modelName: $modelName) 
  }` 

// Create(fields: [String!], inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
export const CREATE = gql`
  query Create($fields: [String!], $inputs: [ObjectScalar!]!, $modelName: String!) { 
    Create(fields:$fields, inputs:$inputs, modelName:$modelName) 
  }` 

// Read(fields: [String!], ids: [ID!], modelName: String!): CrudResult!
export const READ = gql` 
  query Read($fields: [String!], $ids: [ID!], $modelName: String!) { 
    Read(fields:$fields, ids:$ids, modelName:$modelName) {items} 
  }` 

// Update(fields: [String!], inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
export const UPDATE = gql` 
  query Update($fields: [String!], $inputs: [ObjectScalar!]!, $modelName: String!) { 
    Update(fields:$fields, inputs:$inputs, modelName:$modelName) 
  }` 

// Delete(fields: [String!], ids: [ID!], modelName: String!): CrudResult!
export const DELETE = gql` 
  query Delete($fields: [String!], $ids: [ID!], $modelName: String!) { 
    Delete(fields:$fields, ids:$ids, modelName:$modelName) 
  }` 


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