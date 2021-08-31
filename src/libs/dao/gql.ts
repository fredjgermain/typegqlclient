import { gql } from "@apollo/client"; 



// VALIDATE ===============================================
export function VALIDATE(modelName:string) { 
  return gql` 
    query Validate($inputs: [ObjectScalar!]!) { 
      Validate${modelName}(inputs:$inputs) 
    }` 
} 



// MODELDESCRIPTORS ===============================================
// ModelDescriptors(modelsName: [String!]): [ModelDescriptor!]!
export function MODELDESCRIPTORS(subfields:string) { 
  return gql` 
    query ModelDescriptors($modelsName: [String!]) { 
      ModelDescriptors(modelsName:$modelsName) ${subfields} 
    }` 
} 



// CREATE ================================================= 
export function CREATE(modelName:string, subfields:string) { 
  return gql` 
    mutation Create($inputs: [ObjectScalar!]!) { 
      Create${modelName}(inputs:$inputs) { 
        items ${subfields} 
        errors 
      } 
    }` 
} 



// READ =================================================== 
export function READ(modelName:string, subfields:string) {
  return gql` 
    query Read($ids: [String!]) { 
      Read${modelName}(ids:$ids) { 
        items ${subfields} 
        errors 
      } 
    }` 
} 



// UPDATE =================================================
export function UPDATE(modelName:string, subfields:string) {
  return gql` 
    mutation Update($inputs: [ObjectScalar!]!) { 
      Update${modelName}(inputs:$inputs) { 
        items ${subfields} 
        errors 
      } 
    }` 
} 



// DELETE =================================================== 
export function DELETE(modelName:string, subfields:string) {
  return gql` 
    mutation Delete($ids: [String!]!) { 
      Delete${modelName}(ids:$ids) { 
        items ${subfields} 
        errors 
      } 
    }` 
} 
