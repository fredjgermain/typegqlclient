/** ParseDate ===================================
 * 
 * @param date 
 * @returns 
 */
export function ParseDate(date:any) { 
  const dateObject = new Date(date); 
  return { 
    year: dateObject.getFullYear(), 
    month: dateObject.getMonth(), 
    day: dateObject.getDay(), 
  } 
}

/** DaysPerMonth ========================================
 * Takes a year and a month and return the number of days for that month. 
 * @param year 
 * @param month 
 * @returns number of days in a given month. 
 */
 export function DaysPerMonth(year:number, month:number) { 
  if(month === 2) 
    return IsLeapYear(year)? 29: 28; 
  if(month <= 7) 
    return (month % 2 === 0)? 30: 31; 
  return (month % 2 === 0)? 31: 30; 
} 


/** IsLeapYear ===================================
 * Takes a year and return true if that year is a leap year. 
 * @param year 
 * @returns return true if a given year is a leap year. 
 */
export function IsLeapYear(year:number) {
  if( year % 4 !== 0 ) 
    return false; 
  if(year % 100 !== 0) 
    return true; 
  if(year % 4000 !== 0) 
    return false; 
  return true; 
}


/** IsToday ======================================
 * Returns true if a given Date is today. 
 * @param toTest 
 * @returns Returns true if a given Date is today. 
 */
 export function IsToday(toTest:any) { 
  const today = ParseDate(new Date()); 
  const {year, month, day} = ParseDate(toTest); 
  return today.year === year && today.month === month && today.day === day; 
} 
