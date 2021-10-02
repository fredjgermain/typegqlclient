import { gql } from "@apollo/client"; 


// type introspection =====================================
export function Type() { 
  return gql` 
    query __type($name: String!) { 
      __type(name:$name) { 
        name fields { 
          name 
        } 
      } 
    }` 
} 



// VALIDATE ===============================================
export function Validate(modelName:string) { 
  return gql` 
    query Validate($inputs: [ObjectScalar!]!) { 
      Validate${modelName}(inputs:$inputs) 
    }` 
} 



// MODELDESCRIPTORS ===============================================
// ModelDescriptors(modelsName: [String!]): [ModelDescriptor!]!
export function ModelDescriptors(subfields:string) { 
  return gql` 
    query ModelDescriptors($modelsName: [String!]) { 
      ModelDescriptors(modelsName:$modelsName) ${subfields} 
    }` 
} 



// CREATE ================================================= 
export function Create(modelName:string, subfields:string) { 
  return gql` 
    mutation Create($inputs: [ObjectScalar!]!) { 
      Create${modelName}(inputs:$inputs) ${subfields} 
    }` 
} 



// READ =================================================== 
export function Read(modelName:string, subfields:string) {
  return gql` 
    query Read($ids: [String!]) { 
      Read${modelName}(ids:$ids) ${subfields} 
    }` 
} 



// UPDATE =================================================
export function Update(modelName:string, subfields:string) {
  return gql` 
    mutation Update($inputs: [ObjectScalar!]!) { 
      Update${modelName}(inputs:$inputs) ${subfields} 
    }` 
} 



// DELETE =================================================== 
export function Delete(modelName:string, subfields:string) {
  return gql` 
    mutation Delete($ids: [String!]!) { 
      Delete${modelName}(ids:$ids) ${subfields} 
    }` 
} 
