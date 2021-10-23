

type Subfield = {[key:string]:boolean|Subfield} 
export function GetSubfields(src:object, subfields:Subfield) { 
  let subObject = {} as any; 
  Object.entries(subfields).forEach( entry => { 
    const [key, value] = entry; 

    const subfieldvalue = typeof value === "boolean" ? 
      (src as any)[key] : 
      GetSubfields((src as any)[key], value); 
    subObject[key] = subfieldvalue; 
  }) 
  return subObject; 
} 

const src = {_id:'asdasd', nested:{caca:12, nested:{test:'aa'}}} 

console.log( GetSubfields(src, {_id:true}) ) 
console.log( GetSubfields(src, {_id:true, nested:true}) ) 
console.log( GetSubfields(src, {_id:true, nested:{caca:true}}) ) 
console.log( GetSubfields(src, {_id:true, nested:{nested:{test:true}}}) ) 

