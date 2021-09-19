import { Filter } from '../utils';
import { usePager } from './usepager.hook'; 



type IUsePager = ReturnType<typeof usePager>; 



/** PageOfPages
 * Show which page is displayed over how many pages there is. 
 * @param param0 
 * @returns 
 */
export function PageOfPages({pages, pageIndex}:IUsePager) { 
  return <div>Page {pageIndex+1} of {pages?.length ?? 0}</div> 
} 



/** PagerBtns
 * Display button to move from pages to pages. 
 * @param param0 
 * @returns 
 */
export function PagerBtns({pages, pageIndex, SetPageIndex}:IUsePager) { 
  let indexes = pages.map( (p,i) => i); 
  if(indexes.length > 5) 
    indexes = AbbrevIndexes(pageIndex, indexes); 

  return <div> 
    {indexes.map( (index, i) => { 
      return <span key={index}> 
        <button onClick={() => SetPageIndex(index)} disabled={index===pageIndex}>{index+1}</button> 
        {index + 1 !== indexes[i+1] && i < indexes.length-1 && '...'} 
      </span> 
    })} 
  </div> 
} 

/* 
Ask for 7 btn or stop when it its the last 
first, (firstRemainder) index-1, index, index+1, (lastRemainder) last 

how many button left to display? 
Divide remainder by this many left. 


*/

function AbbrevTest(index:number, last:number) { 
  const indexes = Array.from(Array(last+1).keys()); 
  const [paged, remain] = Filter( indexes, ({i}) => [0, index-1, index, index+1, last].includes(i) ); 
  
  const [] = Filter(remain, ({i, positive}) => { 
    const left = 7 - paged.length - positive.length; 

    return left > 0; 
  }) 


  // let remainders = [] as number[]; 
  // for(let i=0; i<=last; i++) { 
  //   if(!indexes.includes(i)) 
  //     remainders.push(i); 
  // } 

  // for(let i=0; i<=remainders.length; i++) { 
  //   if( remainders[i] % howManyBtnLeft ) 
  //     indexes.push(i); 
  // } 
  
    
}



// [0 ... fmid ... X-1, X, X+1, ... mid ... N-1] 
function AbbrevIndexes(index:number, indexes:number[]) { 
  const [first, m1, p1, last] = [0, index-1, index+1, indexes.length-1]; 
  const firstMid = Math.floor(index/2); 
  const lastMid = Math.floor((last-index)/2)+index+1; 

  const abbrev:any[] = []; 
  [first, firstMid, m1, index, p1, lastMid, last].forEach( i => { 
    if(!abbrev.includes(i) && i >= first && i <= last) 
      abbrev.push(i); 
  }); 
  return abbrev; 
} 