import { useState } from 'react'; 

// ---------------------------------------------------------
import { Predicate, Group } from '../utils'; 



/** usePager ============================================== 
 * 
 * 
 * @param ts 
 * @param pageBreak 
 * @returns 
 */
export function usePager(ts:any[], pageBreak:Predicate<any>|number) { 
  const pages = Paging(ts, pageBreak); 
  const [from, to] = [0, pages.length]; 
  const [pageIndex, setPageIndex] = useState(0); 
  
  function SetPageIndex(newIndex:number) { 
    if( from <= newIndex && newIndex < to && newIndex !== pageIndex ) 
      setPageIndex(newIndex); 
  } 

  //const [pageIndex, setPageIndex] = useRange(0, pages.length-1); 
  const page = pages[pageIndex] ?? []; 
  return {page, pages, pageIndex, SetPageIndex} 
} 


function Paging<T>(ts:T[], pageBreak:Predicate<T>|number):T[][] { 
  const predicate:Predicate<T> = typeof pageBreak === 'number' ? 
    ({positive}) => positive.length < pageBreak : pageBreak; 
  return Group(ts, predicate); 
} 

