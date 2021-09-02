export { ToArray, Filter, Sort, Sorts, Group, Order, Unic, IndexArray, Pick, Concatenate } from './utils/arrays.utils'; 
export type { Indexed, Predicate, Comparator } from './utils/arrays.utils'; 

export { StringInterpolation, ReduceToString, SplitWithRegex, StringifyEach } from './utils/string.utils'; 

export { DaysPerMonth, IsLeapYear, IsToday, ParseDate } from './utils/date.utils'; 

export { DefaultWidth, GetInputType, GetValueFromInput, 
  OnEnter, OnEnterOrTab, OnPress, OnTab } from './utils/htmlelement.utils'; 
export type { IEvent } from './utils/htmlelement.utils'; 

export { Copy, DeepCopy, 
  GetDefaultValueByType, GetTypeByValue, 
  IsEmpty, IsInRange, IsNaN, IsNull, 
  GetValueAt, GetValuesAt, SetValuesAt } from './utils/value_type.utils'; 

export { ITypeFromString } from './utils/itype.utils'; 