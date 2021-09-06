import { 
  ApolloClient, 
  NormalizedCacheObject, 
} from "@apollo/client";



// --------------------------------------------------------
import * as request from './gql'; 
import { 
  ReduceSubfields, ParseModelDescriptors, ParseCrudResult, 
  ModelDescriptor, ArgsIds, ArgsModelName, ArgsModelDescriptors, CrudResult
} from './dao.utils'; 
import { IsEmpty } from "../utils/value_type.utils"; 
import { IsNull } from '../utils';



export class Cacher { 
  private client:ApolloClient<NormalizedCacheObject>; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.client = client; 
  }
  

  
  /** MODEL ................................................
   * 
   * @param 
   * @returns ModelDescriptor[] or [] if an error occurs 
   */
  public ModelDescriptors({modelsName, subfields}:ArgsModelDescriptors):ModelDescriptor[] { 
    const defaultSubfields = ["_id accessor label description ifields"]; 
    const query = request.MODELDESCRIPTORS( ReduceSubfields(subfields, defaultSubfields) ); 
    const variables = {modelsName}; 
    
    try{
      const results = this.client.readQuery({query, variables})?.ModelDescriptors as ModelDescriptor[]; 
      return ParseModelDescriptors(results); 
    }catch(err) { 
      return []; 
    } 
  } 



  /** READ ................................................
   * 
   * @param param0 
   * @returns IENtry[] or [] if an error occurs. 
   */
  public Read({modelName, subfields, ids}:ArgsIds):IEntry[] { 
    const reducedSubfields = this.GetReducedSubfields({modelName, subfields}); 
    const query = request.READ(modelName, reducedSubfields); 
    const variables = {ids}; 

    let results = {} as CrudResult; 
    try{ 
      results = ParseCrudResult( this.client.readQuery({query, variables}) ) 
    } catch(err) { 
      results.errors = [err as any]; 
    } 
    
    if(!IsEmpty(results.errors)) 
      return []; 
    return results.items; 
  } 

  

  /** GetIFields ...........................................
   * 
   * @param modelName 
   * @returns 
   */
   public GetIFields(modelName:string):IField[] { 
    const [model] = this.ModelDescriptors({modelsName:[modelName]}); 
    return (model as ModelDescriptor)?.ifields; 
  } 



  /** GetDefaultEntry .....................................
   * 
   * @param modelName 
   * @returns 
   */
  public GetDefaultEntry(modelName:string):IEntry { 
    const ifields = this.GetIFields(modelName); 
    let defaultEntry = {} as IEntry; 

    // Exclude _id and _v 
    ifields.forEach( ifield => { 
      defaultEntry[ifield.accessor] = ifield.type.defaultValue 
    }) 
    return defaultEntry; 
  } 



  /** GetOptions ..........................................
   * 
   * @param ifield 
   * @returns 
   */
  public GetOptions(ifield:IField):IOption[] { 
    // Get Options from Ref
    if(!IsNull(ifield.options?.ref)) 
      return this.GetOptionsFromRef(ifield.options?.ref); 
    
    // Get Options from Enums 
    const enums = ifield.type.enums ?? []; 
    return enums.map( e => { 
      return {value:e, label:e} as IOption; 
    }) 
  }



  /** GetOptionsFromRef .....................................
   * @param modelName 
   * @returns 
   */ 
  private GetOptionsFromRef(modelName:string):IOption[] { 
    //const ifields = this.GetIFields(modelName); 
    let entries = [] as IEntry[]; 

    // subfield 'Abbrev' may not be available ... 
    try { 
      entries = this.Read({modelName, subfields:['_id', 'abbrev']}); 
    } catch(err) { 
      entries = this.Read({modelName, subfields:['_id']}); 
    } 
    return entries.map( entry => { 
      return {value:entry._id, label:entry.abbrev} as IOption; 
    }) 
  } 



  // GetSubfields -----------------------------------------
  private GetReducedSubfields({modelName, subfields}:ArgsModelName):string { 
    const defaultSubfields = this.GetDefaultSubfields(modelName); 
    return ReduceSubfields(subfields, defaultSubfields); 
  }

  private GetDefaultSubfields(modelName:string):string[] { 
    const [model] = this.ModelDescriptors({modelsName:[modelName]}); 
    const subfields = (model as ModelDescriptor)?.ifields.filter( f => f.accessor != '__v'); 
    return subfields?.map( f => f.accessor) ?? ["_id"]; 
  } 
} 
