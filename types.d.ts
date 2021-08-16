/**
 * 
 */
interface Indexer { 
  [key:string]:boolean|Indexer 
} 

/** ITYPE 
 * 
 */
/*interface IType { 
  defaultValue: any; 
  name: string; 
  //nestedType?: IType[] | {[key:string]:IType}; 
  enums?: string[]; // ?? 
  isEnum?: boolean; 
  isArray?: boolean; 
  isScalar?: boolean; 
  isObject?: boolean; 
} */


/*interface IType { 
  name: string; 
  defaultValue: any; 
  enum?: any[]; 
  nestedType?: IType | IType[] | { [key:string]:IType[] }; 

  isEnum?: boolean; 
  isArray?: boolean; 
  isScalar?: boolean; 
  isObject?: boolean; 
} */


/** IOPTION
 * 
*/ 
interface IOption { 
  value:any; 
  label:string; 
}

interface IType { 
  defaultValue: any; 
  name: string; 
  //nestedType?: IType[] | {[key:string]:IType}; 
  enums?: string[]; // ?? 
  isEnum?: boolean; 
  isArray?: boolean; 
  isScalar?: boolean; 
  isObject?: boolean; 
} 

interface IModel { 
  accessor:string, 
  label:string[], 
  description:string[], 
  ifields:IField[], 
} 


interface IField {
  accessor: string; 
  type: IType; 

  label: string; 
  isRef?: boolean; 
  options?: any; 
  abbrev?: boolean; 
  format?: string; 
  order?: number; 

  // required?: boolean; 
  // unique?: boolean; 
  // regex: string ?? 
  // format: string ?? 
  // validators: any[];
  // abbrev: 
  
}



/** IENTRY 
 * 
 */
interface IEntry { 
  _id: string; 
  [key:string]: any; 
} 


/** ERRPROP
 * 
*/
interface ErrProp { 
  name: string; 
  path: string; 
  value: any; 
  [key:string]: any; 
} 

/** IMONGOFIELD 
 * 
*/
interface IMongoField {
  path:string;  // accessor 
  instance:string; 
  validators: any; 
  options: { 
    ref?: string; 
    label?: string; 
    sortType?: string; 
    defaultValue?: any; 
    format?: string; 
    enum?: any[]; 
    abbrev?: boolean; 
    [key:string]:any; 
  }; 
  $embeddedSchemaType?:{ 
    instance:string; 
  }; 
  [key:string]:any; 
}

