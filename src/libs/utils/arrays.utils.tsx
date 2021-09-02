import { IsEmpty } from './value_type.utils'; 



/** PREDICATE =============== 
 * @param t current element.  
 * @param i current index number. 
 * @param a array itself. 
 * @param positive accumulator for positive results.  
 * @param negative accumulator of negative results.  
 * @return boolean if predicate passes of fails. 
 */
export type Predicate<T> = (t:T, i:number, a:T[], positive:T[], negative:T[]) => boolean; 



/** SORTER ================== 
 * @param t current element 
 * @param pivot value to compare to 't' 
 * @return boolean if comparison of 't' and 'pivot' passes or fails. 
 */
export type Comparator<T> = (t:T, pivot:T) => boolean; 



/** UNIC ================= 
 * Takes an array and a criteria of sameness 
 * returns an array without duplicate using "Sameness" as predicate to identify duplicates. 
 * @param array 
 * @param Sameness 
 * @returns 
 */
export function Unic<T>(array:T[], Sameness:Comparator<T>):[T[], T[]] { 
  const isUnic = (t:T, i:number, a:T[], positive:T[]) => !positive.some( p => Sameness(t, p) ); 
  return Filter(array, isUnic); 
} 



/** TOARRAY ================= 
 * Converts an object into a array if it is not already an array. Returns the array itself it is already an array, or returns an empty array if it is empty. 
 * @param toArray value to be converted into an array. 
 * @returns an array. 
 */
export function ToArray(toArray:any|any[]):any[] { 
  return toArray !== undefined ? [toArray].flat() : [] as any[]; 
} 



/** PICK ==================== 
 * 
 * @param toPickFrom 
 * @param pickingOrder 
 * @param picker 
 * @returns 
 */ 
export function Pick<T, U>(toPickFrom:T[] = [], pickingOrder:U[] = [], picker:(t:T, u:U) => boolean):T[] { 
  let picked = [] as T[]; 
  pickingOrder.forEach( p => { 
    const found = toPickFrom.filter( t => picker(t, p) ) 
    if(found) 
      picked = [...picked, ...found]; 
  }); 
  return picked; 
}



/** ORDER =================================================
 * 
 * @param toOrder 
 * @param orderers 
 * @returns 
 */
export function Order<T>(toOrder:T[] = [], orderers:Predicate<T>[]):[T[], T[]] { 
  let ordered = []; 
  let unordered = [...toOrder]; 
  orderers.forEach( orderer => { 
    const [filter, unfiltered] = Filter(unordered, orderer); 
    ordered = [...ordered, ...filter]; 
    unordered = [...unfiltered]; 
  }) 
  return [ordered, unordered]; 
} 



/** GROUP =================== 
 * Groups elements using a single predicate. 
 * @param array array to group. 
 * @param grouping grouping is a criteria by which to group elements. 
 * @returns an array of grouped values (array of arrays). 
 */ 
export function Group<T>(array:T[] = [], grouping:Predicate<T>):T[][] { 
  if(IsEmpty(array)) 
    return []; 
  const [grouped, ungrouped] = Filter(array, grouping); 
  const remainder = Group<T>(ungrouped, grouping); 
  return [grouped, ...remainder]; 
}



/** SORTS ===================
 * Quick sorts an array using multiple criterias. The reversing of the sorters is necessary to properly sort. 
 * @param array array to sort. 
 * @param sorters array of sorting predicates. 
 * @returns sorted array 
 */
export function Sorts<T>(array:T[] = [], sorters:Comparator<T>[] = []):T[] { 
  let sorted = [...array]; 
  if(IsEmpty(sorters)) 
    return sorted; 
    const _sorters = [...sorters].reverse(); 
  _sorters.forEach( sorter => sorted = Sort(sorted, sorter)) 
  return sorted; 
} 



/** SORT ====================
 * Quick sort an array
 * @param array array to sort. 
 * @param sorter sorting predicate. 
 * @returns sorted array. 
 */
export function Sort<T>(array:T[] = [], sorter:Comparator<T>):T[] { 
  const [pivot, ...remainder] = [...array]; 
  if(IsEmpty(remainder)) 
    return pivot ? [pivot]:[]; 
  const [inclusion, exclusion] = Filter(remainder, (t:T) => sorter(t, pivot)); 
  const left = Sort<T>(inclusion, sorter); 
  const right = Sort<T>(exclusion, sorter); 
  return [...left, pivot, ...right]; 
} 



/** FILTER ==================
 * Takes an array and filter that array according to a predicate. Returns 2 accumulators; 
 * accumulator "positive" for elements that pass the predicate. 
 * accumulator "negative" for elements that fail the predicate. 
 * @param array array to filter 
 * @param predicate filtering predicate 
 * @returns 2 arrays: 
 * - First array matching values. 
 * - Second array not matching values. */
export function Filter<T>(array:T[] = [], predicate:Predicate<T>):[T[], T[]] { 
  const positive = [] as T[]; 
  const negative = [] as T[]; 
  array.forEach( (v:T, i:number, a:T[]) => 
    predicate(v, i, a, positive, negative) ? positive.push(v): negative.push(v) 
  ) 
  return [positive, negative]; 
} 



/** CONCATENATE ===================
 * Concatenate 2 arrays 
 * @param A an array or single element 
 * @param B an array or single element 
 * @param predicate 
 * @returns return a single array
 */
export function Concatenate<T>(A:T|T[] = [], B:T|T[] = [], predicate?:Predicate<T>): T[] { 
  const union = [...ToArray(A), ...ToArray(B)]; 
  return predicate ? Filter(union, predicate)[0] : union; 
} 



export interface Indexed<T> { 
  i:number; 
  t:T; 
}
/** IndexArray 
 * Wrap each element of an array to help keep track of their original order even after an array transformation. 
 * @param toIndex 
 * @returns 
 */
 export function IndexArray<T>(toIndex:T[] = []):Indexed<T>[] { 
  return toIndex.map( (t,i) => { 
    return {i, t} as Indexed<T>; 
  }); 
} 
