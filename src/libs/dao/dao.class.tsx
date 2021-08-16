import React from 'react'; 
import { 
  ApolloClient, 
  NormalizedCacheObject, 
} from "@apollo/client"; 

// --------------------------------------------------------
import { Cacher } from './cacher.class'; 
import { Fetcher } from './fetcher.class'; 


/** 
DAO --- map to Apollo client ... 
--- 
// ASYNC METHODS 
Model => IModel 
Validate => IError[] 

Create => IResult 
Read => IResult 
Update => IResult 
Delete => IResult 

// From cached data, NOT ASYNC METHODS 
GetEntry => IEntry 
GetDefaultEntry => IEntry 
GetAbbrevEntry => string 
GetOptions => IOption[] (from enums? or from ref? and Abbrev) 
*/

export const DaoContext = React.createContext({} as Dao); 

type EntryPredicate = string|((entry:IEntry)=>boolean); 
// Complete each methods to map it to the Apollo clients functions etc. 
export class Dao { 
  cacher:Cacher; 
  fetcher:Fetcher; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.cacher = new Cacher(client); 
    this.fetcher = new Fetcher(client); 
  }


  /** GetEntry ............................................
   * 
   * @param modelName 
   * @param predicate 
   * @returns 
   */
  public GetEntry(modelName:string, predicate:string|((entry:IEntry)=>boolean)):IEntry { 
    if(!predicate) 
      return this.GetDefaultEntry(modelName); 
    if(typeof predicate === 'string') 
      return this.GetEntry(modelName, (entry:IEntry) => entry._id === predicate) 

    // replace with proper collection entries ... 
    const entries = this.cacher.Read({modelName}); 
    return entries.find(predicate) ?? this.GetDefaultEntry(modelName); 
  } 


  /** GetDefaultEntry .....................................
   * 
   * @param modelName 
   * @returns 
   */
  public GetDefaultEntry(modelName:string):IEntry { 
    const {ifields} = this.cacher.Model({modelName}); 
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
  public GetAbbrevEntry(modelName:string, entry:IEntry):string { 
    return ''; 
  } 


  /** GetOptions ..........................................
   * 
   * @param ifield 
   * @returns 
   */
  public GetOptions(ifield:IField):IOption[] { 
    // Get Options from Ref
    if(ifield.isRef) 
      return this.GetOptionsFromRef(ifield); 
    
    // Get Options from Enums 
    const enums = ifield.type.enums ?? []; 
    return enums.map( e => { 
      return {value:e, label:e} as IOption; 
    }) 
  }

  private GetOptionsFromRef(ifield:IField):IOption[] { 
    const foreignRef = ifield.options?.ref ?? ''; 
    const entries = this.cacher.Read({modelName:foreignRef}) ?? [] 
    return entries.map( entry => { 
      const abbrev = this.GetAbbrevEntry(ifield.options.ref, entry); 
      const value = entry._id; 
      const label = abbrev ?? entry._id; 
      return {value, label} as IOption; 
    })
  } 
}
