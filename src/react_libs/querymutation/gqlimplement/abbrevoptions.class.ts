import { ApolloClient, NormalizedCacheObject } 
  from "@apollo/client"; 

// -------------------------------------------------------- 
import { GqlIntrospection } from "./introspection.class"; 
import { GqlCrudCache } from "./crudcache.class"; 
import { GqlModel } from "./models.class"; 



export class GqlAbbrevOptions { 
  private introspection: GqlIntrospection; 

  private models: GqlModel; 
  private cacher: GqlCrudCache; 

  constructor(client:ApolloClient<NormalizedCacheObject>) { 
    this.introspection = new GqlIntrospection(client); 
    this.models = new GqlModel(client); 
    this.cacher = new GqlCrudCache(client); 
  } 


  // Get Default Entry ------------------------------------
  public GetDefaultEntry(modelName:string): IEntry { 
    return this.models.GetDefaultEntry(modelName); 
  } 

  // Get Options ------------------------------------------ 
  public GetIOptions(ifield:IField): IOption[] { 
    return ifield.isRef ? 
      this.GetOptionsFromRef(ifield): 
      this.GetOptionsFromEnums(ifield); 
  } 

  private GetOptionsFromRef(ifield:IField):IOption[] { 
    const modelName = ifield.options?.ref ?? ''; 
    const abbrevSubfield = this.GetAbbrevAccessor(modelName); 
    let subfields = abbrevSubfield === '_id' ? [] : [abbrevSubfield]; 
    subfields = ['__typename', '_id', ...subfields]; 
    const entries = this.cacher.Read({modelName, subfields}); 
    const options = entries.map( entry => { 
      const {__typename, _id} = entry; 
      return {value:{__typename, _id}, label:entry[abbrevSubfield]} as IOption; 
    }) 
    return options; 
  } 

  private GetOptionsFromEnums(ifield:IField):IOption[] { 
    const enums = ifield?.type?.enums ?? []; 
    return enums.map( e => { 
      return {value:e, label:e} as IOption; 
    }) 
  }

  /** GetAbbrevAccessor -------------------------------- 
   * find and returns abbrev field if it exist, 
   * else first string field if it has one, 
   * else first number field if it has one, 
   * else return '_id' as default abbrev field. 
   * @param param0 
   * @returns 
   */
   public GetAbbrevAccessor(modelName:string): string { 
    try{
      const {fields} = this.introspection.CacheTypeIntrospection({modelName}); 
      return fields.find( f => f.name==='abbrev')?.name ?? 
        fields.find( f => this.introspection.FieldNestedType(f.type).name === 'STRING' && f.name.includes('_') )?.name ?? 
        fields.find( f => this.introspection.FieldNestedType(f.type).name === 'NUMBER' && f.name.includes('_') )?.name ?? 
        '_id'; 
    }catch(error) { 
      return '_id'; 
    } 
  } 
} 
