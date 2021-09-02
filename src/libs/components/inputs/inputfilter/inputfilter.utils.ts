import { IsEmpty, GetValueAt } from '../../../utils'; 


export function FilterPredicate(strPredicate:string, type:string, keys?:string[]): (x:any) => boolean { 
  console.log(strPredicate, type, keys); 
  
  let predicate = (x:any) => true; 
  if(IsEmpty(strPredicate)) 
    return predicate; 
  
  if(type === 'boolean' || type === 'date') 
    predicate = EqualPredicate(strPredicate); 
  else if(type === 'string') 
    predicate = StringMatchPredicate(strPredicate); 
  else 
    predicate = LambdaPredicate(strPredicate); 

  return !IsEmpty(keys) ? 
    (x:any) => 
      predicate(GetValueAt(x, keys)): 
      predicate; 
} 




function EqualPredicate(strPredicate:string): (x:any) => boolean { 
  return (x:string) => { 
    return String(x) === strPredicate; 
  } 
} 

function StringMatchPredicate(strPredicate:string): (x:any) => boolean { 
  return (x:string) => { 
    return !!x.match(strPredicate); 
  } 
} 

function LambdaPredicate(strPredicate:string): (x:any) => boolean { 
  /*const operator =  /[(>=)|(<=)|(>)|(<)|(=)]/ 
  const operand =  /[(>=)|(<=)|(>)|(<)|(=)]/ */ 
  const seperator = /[(&&)]/ 
  const strPredicates = strPredicate.split(seperator).filter(s => s!==''); 
  const predicates:((x:any) => boolean)[] = []; 
  strPredicates.forEach( p => { 
    try{ 
      const func = (x:any):boolean => eval(x.toString() + p); 
      func(0); 
      predicates.push(func); 
    }catch(error) { 
      return (x:any) => true; 
    }; 
  }) 
  return (x:any) => predicates.every( predicate => predicate(x) ); 
}