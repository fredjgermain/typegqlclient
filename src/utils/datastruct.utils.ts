import { Filter, Pick, AreEqual, IsEmpty, ToArray } from './utils'; 





/** FieldValidation --------------------------------------- 
 * 
 * @param value 
 * @param ifield 
 * @returns 
 */
 export function FieldValidation(value:any, ifield:IField) { 
  if(ifield.options && ifield.options.required && IsEmpty(value)) 
    return false; 
  if(ifield.options && ifield.options.regex && !(new RegExp(ifield.options.regex).test(value ?? '')) ) 
    return false; 
  return true; 
}



/** PickOptions -------------------------------------------
 * Returns an array Options matching the values. 
 * 
 * @param values 
 * @param options 
 * @returns 
 */
export function PickOptions(values:any[], options:IOption[]) { 
  return Pick(options, ToArray(values), (o, v) => AreEqual(o.value, v)) 
} 



/** SelectUnselect ----------------------------------------
 * If newValue is found in selection 
 *  then it is removed from selection. 
 * else 
 *  it is added to selection. 
 * @param newValue 
 * @param selection 
 * @returns 
 */
 export function SelectUnselect(newValue:any, selection:any[]) { 
  const [toUnselect, toSelection] = Filter(ToArray(selection), ({t}) => AreEqual(t, newValue)) 
  if(IsEmpty(toUnselect)) 
    return [...toSelection, newValue]; 
  return [...toSelection]; 
}



// /** SelectUnselectOptions ---------------------------------
//  * If newValue is found in selection 
//  *  then it is removed from selection. 
//  * else 
//  *  it is added to selection. 
//  * @param newValue 
//  * @param options 
//  * @returns 
//  */
// export function SelectUnselectOptions(newValue:any, selection:any[], options:IOption[]) { 
//   const newSelection = SelectUnselect(newValue, selection); 
//   return PickOptions(newSelection, options); 
// } 
