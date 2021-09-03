export type ModelDescriptor = IModel & {_id:string}; 

export type IError = object; 
export type CrudResult = {items:IEntry[], errors:IError[]}; 


export type ArgsSubfields = {subfields?:string[]} 
export type ArgsModelName = {modelName:string} & ArgsSubfields 
export type ArgsModelDescriptors = {modelsName?:string[]} & ArgsSubfields 
export type ArgsInputs = ArgsModelName & {inputs:any[]} 
export type ArgsIds = ArgsModelName & {ids?:string[]} 



export function ParseModelDescriptors(queryResult:any):ModelDescriptor[] { 
  const results = Object.values(queryResult).flat() as any[]; 
  return results.map( item => { 
    const {_id, accessor, label, description, ifields} = item; 
    return {_id, accessor, label, description, ifields} as ModelDescriptor; 
  }); 
}

export function ParseCrudResult(queryResult:any):CrudResult { 
  const [parsed] = Object.values(queryResult) as CrudResult[]; 
  return {items:Remove__typename(parsed.items), errors:parsed.errors}; 
}


function Remove__typename(items:IEntry[]) { 
  return items.map( ({__typename, ...item}:IEntry) => item ) 
}

// REDUCE SUBFIELDS 
export function ReduceSubfields(subfields?:string[], defaultSubfields?:string[]) { 
  const reducer = (prev:string, curr:string) => `${prev} ${curr}`; 
  if(!subfields || subfields.length === 0) 
    return `{${defaultSubfields?.reduce( reducer, '')}}`; 
  return `{${subfields?.reduce( reducer, '')}}`; 
} 
