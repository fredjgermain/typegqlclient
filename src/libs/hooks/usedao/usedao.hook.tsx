import React from 'react'; 


/** 
DAO --- map to Apollo client ... 
--- 
Model => IModel 
Validate => IError[] 

Create => IResult 
Read => IResult 
Update => IResult 
Delete => IResult 

GetEntry => IEntry 
GetDefaultEntry => IEntry 
GetAbbrevEntry => string 
GetOptions => IOption[] (from enums? or from ref? and Abbrev) 
*/

export const DaoContext = React.createContext({} as Dao); 


type EntryPredicate = string|((entry:IEntry)=>boolean); 
// Complete each methods to map it to the Apollo clients functions etc. 
export class Dao { 


  constructor(entries:IEntry[]) { 

  }


  public async Model(modelName:string):Promise<IModel> { 
    return {accessor:'', label:[], description:[], ifields:[]}; 
  } 

  public async Read(modelName:string, ids?:string[]):Promise<IEntry[]> { 
    const entries = [] as IEntry[]; 
    return entries.filter( entry => ids.includes(entry._id) ); 
  } 

  public async Create() { 

  } 

  public async Update() { 

  } 


  /** Delete ..............................................
   * 
   */
  public async Delete() { 

  }


  /** GetIModel ...........................................
   * 
   * @param modelName 
   * @returns 
   */
  public async GetIModel(modelName:string):Promise<IModel> { 
    return {} as IModel; 
  } 


  /** GetEntries ..........................................
   * 
   * @param modelName 
   * @param predicate 
   * @returns 
   */
  public async GetEntries(modelName:string, predicate?:string[]|((entry:IEntry)=>boolean)) { 
    const entries = [] as IEntry[]; 
    if(!predicate) 
      return entries; 
    if(Array.isArray(predicate)) 
      return this.GetEntries(modelName, (entry:IEntry) => predicate.includes(entry._id) ) 
    
    return entries.filter(predicate); 
  } 


  /** GetEntry ............................................
   * 
   * @param modelName 
   * @param predicate 
   * @returns 
   */
  public async GetEntry(modelName:string, predicate:string|((entry:IEntry)=>boolean)) { 
    if(!predicate) 
      return this.GetDefaultEntry(modelName); 
    if(typeof predicate === 'string') 
      return this.GetEntry(modelName, (entry:IEntry) => entry._id === predicate) 

    // replace with proper collection entries ... 
    const entries = [] as IEntry[]; 
    return entries.find(predicate) ?? this.GetDefaultEntry(modelName); 
  } 


  /** GetDefaultEntry .....................................
   * 
   * @param modelName 
   * @returns 
   */
  public async GetDefaultEntry(modelName:string):Promise<IEntry> { 
    const {ifields} = await this.GetIModel(modelName); 
    let defaultEntry = {} as IEntry; 
    ifields?.forEach( ifield => { 
      defaultEntry[ifield.accessor] = ifield.type.defaultValue 
    }) 
    return defaultEntry; 
  } 


  /** GetAbbrevEntry ......................................
   * 
   * @param modelName 
   * @param entry 
   * @returns 
   */
  public async GetAbbrevEntry(modelName:string, entry:IEntry):Promise<string> { 
    return ''; 
  } 

  /** GetOptions ..........................................
   * 
   * @param ifield 
   * @returns 
   */
  public async GetOptions(ifield:IField):Promise<IOption[]> { 
    // Get Options from Ref
    if(ifield.isRef) 
      return await this.GetOptionsFromRef(ifield); 
    
    // Get Options from Enums 
    if(ifield.type.enums) { 
      const enums = ifield.type.enums; 
      return enums.map( e => { 
        return {value:e, label:e} as IOption; 
      }) 
    }
  }

  private async GetOptionsFromRef(ifield:IField):Promise<IOption[]> { 
    const entries = [] as IEntry[]; // foreign entries ... 
    const options = [] as IOption[]; 
    entries.forEach( async entry => { 
      const abbrev = await this.GetAbbrevEntry(ifield.options.ref, entry); 
      const value = entry._id; 
      const label = abbrev ?? entry._id; 
      options.push({value, label} as IOption); 
    }); 
    return options; 
  } 
} 