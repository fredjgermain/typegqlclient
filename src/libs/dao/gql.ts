import { DocumentNode, gql } from "@apollo/client"; 


/*export function TEST2(subfields:DocumentNode) {
  return gql` 
    query Test($modelName:String!) { 
      Test(modelName:$modelName) ${subfields} 
    }` 
}*/

export const FACTORQUERY = gql` 
  query ReadForm { 
    items { 
      title 
    } 
  }` 

/*export function FactorQuery(subfields:DocumentNode) { 
  //const func = gql`ReadForm`; 
  return gql` 
    query ReadForm { 
      title
    } 
  ` 
} */


// Model(modelName: String!): GQLModel! 
export const MODEL = gql` 
  query ModelDescriptors($modelsName: [String!]!) { 
    ModelDescriptors(modelsName:$modelsName) {
      accessor
    } 
  }` 

// Validate(inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
export const VALIDATE = gql` 
  query Validate($inputs: [ObjectScalar!]!, $modelName: String!) { 
    Validate(inputs:$inputs, modelName: $modelName) {items errors} 
  }` 

// Create(fields: [String!], inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
export const CREATE = gql`
  mutation Create($fields: [String!], $inputs: [ObjectScalar!]!, $modelName: String!) { 
    Create(fields:$fields, inputs:$inputs, modelName:$modelName) {items errors} 
  }` 

// Read(fields: [String!], ids: [ID!], modelName: String!): CrudResult!
export const READ = gql` 
  query Read($fields: [String!], $ids: [ID!], $modelName: String!) { 
    Read(fields:$fields, ids:$ids, modelName:$modelName) {items errors} 
  }` 

// Update(fields: [String!], inputs: [ObjectScalar!]!, modelName: String!): CrudResult!
export const UPDATE = gql` 
  mutation Update($fields: [String!], $inputs: [ObjectScalar!]!, $modelName: String!) { 
    Update(fields:$fields, inputs:$inputs, modelName:$modelName) {items errors} 
  }` 

// Delete(fields: [String!], ids: [ID!], modelName: String!): CrudResult!
export const DELETE = gql` 
  mutation Delete($fields: [String!], $ids: [ID!], $modelName: String!) { 
    Delete(fields:$fields, ids:$ids, modelName:$modelName) {items errors} 
  }` 
