import { Group, Predicate } from '../../utils'; 

export function Paging<T>(ts:T[], pageBreak:Predicate<T>|number):T[][] { 
  const _pageBreak = PagingPredicate(pageBreak); 
  return Group(ts, _pageBreak); 
} 

function PagingPredicate<T>(pageBreak:Predicate<T>|number): Predicate<T> { 
  if(typeof pageBreak === 'number') 
    return PagingPredicate( (t:T, i:number, a:T[], positive:T[]) => positive.length < pageBreak); 
  return pageBreak; 
} 

// [0 ... fmid ... X-1, X, X+1, ... mid ... N-1] 
export function AbbrevIndexes(index:number, indexes:number[]) { 
  const [first, m1, p1, last] = [0, index-1, index+1, indexes.length-1]; 
  const firstMid = Math.floor(index/2); 
  const lastMid = Math.floor((last-index)/2)+index+1; 

  const abbrev = []; 
  [first, firstMid, m1, index, p1, lastMid, last].forEach( i => { 
    if(!abbrev.includes(i) && i >= first && i <= last) 
      abbrev.push(i); 
  }); 
  return abbrev; 
} 