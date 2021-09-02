import { useState } from 'react'; 

// -------------------------------------------------------- 
import { Filter, IsEmpty } from '../../../utils'; 
import { FilterPredicate } from './inputfilter.utils'; 


type FilterObj<T> = {[key:string]:{type:string, strPredicate:string}} 

export function useFilter<T>(toFilter:T[], defaultFilterObj?:FilterObj<T>) { 
  const [filterObj, setFilterObj] = useState(defaultFilterObj ?? {}) 

  // Convert SorterObject into an predicates array usable by Sorts
  const predicates = Object.keys(filterObj).map( key => { 
    const {type, strPredicate} = filterObj[key]; 
    const predicate = FilterPredicate(strPredicate, type, [key]); 
    return predicate; 
  })

  const filter = (t: T, i: number, a: T[], positive: T[], negative: T[]) => predicates.every( predicate => {
    return predicate(t); 
  }); 
  
  function ResetFilter() { 
    setFilterObj(defaultFilterObj ?? {}); 
  } 

  function SetFilterObj(newFilterObj:FilterObj<T>) { 
    let copyFilters = {} as FilterObj<T>; 
    // Ignore newSorter Value if it === 0; 
    Object.keys(newFilterObj).forEach( key => { 
      if(newFilterObj[key] && !IsEmpty(newFilterObj[key].strPredicate)) 
        copyFilters[key] = newFilterObj[key]; 
    }) 
    setFilterObj(copyFilters); 
  } 

  const [filteredValues] = Filter(toFilter, filter); 
  return {filteredValues, filterObj, SetFilterObj, ResetFilter} 
}