import { Predicate } from '../../utils'; 
import { useRange } from '../../hooks/useRange.hook'; 
import { Paging } from './pager.utils'; 


export interface IPageHook { 
  page: any[]; 
  pages: any[][]; 
  pageIndex: number; 
  setPageIndex: (newIndex: number) => void; 
} 

export function usePager(ts:any[], pageBreak:Predicate<any>|number):IPageHook { 
  const pages = Paging(ts, pageBreak); 
  const [pageIndex, setPageIndex] = useRange(0, pages.length-1); 
  const page = pages[pageIndex] ?? []; 
  return {page, pages, pageIndex, setPageIndex} 
} 



