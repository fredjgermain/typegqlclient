import { IPageHook } from './pager.hook'; 
import { AbbrevIndexes } from './pager.utils'; 


/** PageOfPages
 * Show which page is displayed over how many pages there is. 
 * @param param0 
 * @returns 
 */
export function PageOfPages({pages, pageIndex}:IPageHook) { 
  return <div>Page {pageIndex+1} of {pages?.length ?? 0}</div> 
} 



/** PagerBtns
 * Display button to move from pages to pages. 
 * @param param0 
 * @returns 
 */
export function PagerBtns({pages, pageIndex, setPageIndex}:IPageHook) { 
  let indexes = pages.map( (p,i) => i); 
  if(indexes.length > 5) 
    indexes = AbbrevIndexes(pageIndex, indexes); 

  return <div> 
    {indexes.map( (index, i) => { 
      return <span key={index}> 
        <button onClick={() => setPageIndex(index)} disabled={index===pageIndex}>{index+1}</button> 
        {index + 1 !== indexes[i+1] && i < indexes.length-1 && '...'} 
      </span> 
    })} 
  </div> 
} 

