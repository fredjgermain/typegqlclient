
type CreateArgs = {modelName:string, inputs:Partial<IEntry>[], subfields?:string[]} 
type ReadArgs = {modelName:string, ids?:string[], subfields?:string[]} 
type UpdateArgs = {modelName:string, inputs:IEntry[], subfields?:string[]} 
type DeleteArgs = {modelName:string, ids?:string[], subfields?:string[]} 
type TSubfield = string | TSubfield[]; 