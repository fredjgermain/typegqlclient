import { useState } from 'react'; 

// -------------------------------------------------------- 
import { Sorts } from '../../../utils'; 

enum SortDirection {
  Ascending = 1, 
  Unsort = 0, 
  Descending = -1, 
} 
type SorterObj = {[key:string]:SortDirection} 


export function useSorter<T>(toSort:T[], defaultSort?:SorterObj) { 
  const [sorter, setSorter] = useState(defaultSort ?? {}); 

  // Convert SorterObject into an predicates array usable by Sorts
  const predicates = Object.keys(sorter).map( key => { 
    if( sorter[key] > 0 ) 
      return (t:any, pivot:any) => t[key] < pivot[key] 
    if( sorter[key] < 0 ) 
      return (t:any, pivot:any) => t[key] > pivot[key] 
    return (t:any, pivot:any) => false; 
  }) 

  function ResetSorter() { 
    setSorter(defaultSort ?? {}); 
  } 

  // Should treat the re-ordering of criteria seperatly ... 
  function SetSorter(newSorter:SorterObj) { 
    let copySorter = {} as SorterObj; 
    // Ignore newSorter Value if it === 0; 
    Object.keys(newSorter).forEach( key => { 
      if(newSorter[key]!=0) 
        copySorter[key] = newSorter[key]; 
    }) 
    // Persists values from sorter only if they're not modified. 
    Object.keys(sorter).forEach( key => { 
      if(!Object.keys(newSorter).includes(key)) 
        copySorter[key] = sorter[key]; 
    }) 
    setSorter(copySorter); 
  } 

  const sortedValues = Sorts(toSort, predicates); 
  return {sortedValues, sorter, SetSorter, ResetSorter} 
} 