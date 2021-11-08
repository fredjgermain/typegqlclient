export enum EnumCrud { 
  Create = 'Create', 
  Read = 'Read', 
  Update = 'Update', 
  Delete = 'Delete', 
}



export type TIdsArgs = {modelName:string, ids?:string[]} 
export type TEntriesArgs = {modelName:string, inputs:IEntry[]} 



export interface IDao { 
  // Fetch ------------------------------------------------ 
  Models: (args:{modelNames:string[]}) => Promise<IModel[]> 

  BackValidation: (args:TEntriesArgs) => Promise<boolean[]> 
  
  Create: (args:TEntriesArgs) => Promise<IEntry[]> 
  Read: (args:TIdsArgs) => Promise<IEntry[]> 
  Update: (args:TEntriesArgs) => Promise<IEntry[]> 
  Delete: (args:TIdsArgs) => Promise<IEntry[]> 

  // Cache ------------------------------------------------ 
  CacheModels: (args:{modelNames:string[]}) => IModel[]; 

  FrontValidation: (args:TEntriesArgs) => boolean[] 
  
  CacheCreate: (args:TEntriesArgs) => IEntry[] 
  CacheRead: (args:TIdsArgs) => IEntry[] 
  CacheUpdate: (args:TEntriesArgs) => IEntry[] 
  CacheDelete: (args:TIdsArgs) => IEntry[] 

  // Get -------------------------------------------------- 
  GetDefaultEntry: (modelName:string) => IEntry; 
  GetAbbrevAccessor: (modelName:string) => string; 
  GetIOptions: (ifield:IField) => IOption[]; 
}



// export class Dao { 
//   private implementation:IDao; 
//   constructor(implementation:IDao) { 
//     this.implementation = implementation; 
//   } 

//   // Fetch --------------------------------------- 
//   public async Models(args:{modelNames:string[]}):Promise<IModel[]> { 
//     return this.implementation.Models(args); 
//   } 

//   public async BackEndValidation(args:TEntriesArgs):Promise<boolean[]> { 
//     return this.implementation.BackEndValidation(args); 
//   } 

//   public async Create(args:TEntriesArgs):Promise<IEntry[]> { 
//     return this.implementation.Create(args); 
//   } 
//   public async Read(args:TIdsArgs):Promise<IEntry[]> {
//     return this.implementation.Read(args); 
//   } 
//   public async Update(args:TEntriesArgs):Promise<IEntry[]> {
//     return this.implementation.Update(args); 
//   } 
//   public async Delete(args:TIdsArgs):Promise<IEntry[]> { 
//     return this.implementation.Delete(args); 
//   }


//   // Cache ------------------------------------------------ 
//   public CacheModels(args:{modelNames:string[]}):IModel[] { 
//     return this.implementation.CacheModels(args); 
//   } 

//   public FrontEndValidation(args:TEntriesArgs): boolean[] { 
//     return this.implementation.FrontEndValidation(args); 
//   } 
  
//   public CacheCreate(args:TEntriesArgs): IEntry[] { 
//     return this.implementation.CacheCreate(args); 
//   } 
//   public CacheRead(args:TIdsArgs): IEntry[] { 
//     return this.implementation.CacheRead(args); 
//   } 
//   public CacheUpdate(args:TEntriesArgs): IEntry[] { 
//     return this.implementation.CacheUpdate(args); 
//   } 
//   public CacheDelete(args:TIdsArgs): IEntry[] { 
//     return this.implementation.CacheDelete(args); 
//   } 

//   // Get -------------------------------------------------- 
//   public GetDefaultEntry(model:IModel):IEntry { 
//     return this.implementation.GetDefaultEntry(model); 
//   } 
//   public GetOptions(ifield:IField):IOption[] { 
//     return this.implementation.GetOptions(ifield); 
//   } 
//   public GetAbbrevIField(model:IModel):IField { 
//     return this.implementation.GetAbbrevIField(model); 
//   } 
// }

