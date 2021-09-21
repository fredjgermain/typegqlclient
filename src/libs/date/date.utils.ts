// DATE methods ###########################################
export function ParseDate(date:any) { 
  const dateObject = new Date(date); 
  return {year:dateObject.getFullYear(), month:dateObject.getMonth()+1, date:dateObject.getDate()} 
}

// returns date in format yyyy-mm-dd
export function DateToString(date:any) { 
  try{ 
    return date.toISOString().substring(0, 10); // returns date in format yyyy-mm-dd
  } catch{ 
    try{ 
      const _date = new Date(date); 
      return _date.toISOString().substring(0, 10); // returns date in format yyyy-mm-dd
    }catch{
      return 
    }
  } 
} 

export function DaysPerMonth(year:number, month:number) { 
  if(month === 2) 
    return IsLeapYear(year)? 29: 28; 
  if(month <= 7) 
    return (month % 2 === 0)? 30: 31; 
  return (month % 2 === 0)? 31: 30; 
} 

export function IsLeapYear(year:number) {
  if( year % 4 !== 0 ) 
    return false; 
  if(year % 100 !== 0) 
    return true; 
  if(year % 4000 !== 0) 
    return false; 
  return true; 
}

export function IsToday(toTest:any) { 
  const today = ParseDate(new Date()); 
  const {year, month, date} = ParseDate(toTest); 
  return today.year === year && today.month === month && today.date === date; 
}