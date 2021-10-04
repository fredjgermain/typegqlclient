export type ModelDescriptor = IModel & {_id:string}; 

export type IError = object; 
export type CrudResult = {items:IEntry[], errors:IError[]}; 


export type ArgsSubfields = {subfields?:string[]} 
export type ArgsModelName = {modelName:string} & ArgsSubfields 
export type ArgsModelDescriptors = {modelsName?:string[]} & ArgsSubfields 
export type ArgsInputs = ArgsModelName & {inputs:IEntry[]} 
export type ArgsIds = ArgsModelName & {ids?:string[]} 



/** 
 * 
 * @param queryResult 
 * @returns 
 */
export function ParseTypeIntrospection(queryResult:any) { 
  const [result] = Object.values(queryResult).flat() as any[]; 
  const {__typename, ...introspection} = result; 
  return introspection; 
}



/** ParseModelDescriptors ................................. 
 * 
 * @param queryResult 
 * @returns 
 */
export function ParseModelDescriptors(queryResult:any):ModelDescriptor[] { 
  const results = Object.values(queryResult).flat() as any[]; 
  const parsed = results.map( item => { 
    const {_id, accessor, label, description, ifields} = item; 
    return {_id, accessor, label, description, ifields} as ModelDescriptor; 
  }); 
  return parsed; 
} 



export function ParseEntries(queryResult:any):IEntry[] { 
  const [parsed] = Object.values(queryResult); 
  return parsed as IEntry[]; 
}



export function ParseCrudError(error:any) { 
  const [errors] = error.graphQLErrors[0]?.extensions?.exception?.errprops; 
  return errors.errors; 
} 



/** Remove__typename ...............................
 * Takes an array of entries and returns that array after removing the superfluous field '__typename'. 
 * @param items 
 * @returns 
 */
function Remove__typename(items:any[]) { 
  return items.map( ({__typename, ...item}:any) => item ) 
}


/** ParseCrudResult ....................................... 
 * 
 * @param queryResult 
 * @returns CrudResult {items, errors} 
 */
 export function ParseCrudResult(queryResult:any):CrudResult { 
  const [parsed] = Object.values(queryResult) as CrudResult[]; 
  return {items:Remove__typename(parsed.items) as IEntry[], errors:parsed.errors}; 
}




/** ReduceSubfields ........................................ 
 * Reduces a string array to a single array seperated with white spaces 
 * @param subfields 
 * @param defaultSubfields 
 * @returns 
 */
export function ReduceSubfields(subfields?:string[], defaultSubfields?:string[]) { 
  const reducer = (prev:string, curr:string) => `${prev} ${curr}`; 
  if(!subfields || subfields.length === 0) 
    return `{${defaultSubfields?.reduce( reducer, '')}}`; 
  return `{${subfields?.reduce( reducer, '')}}`; 
} 
