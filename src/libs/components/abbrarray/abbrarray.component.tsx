export function AbbrevArray({toAbbrev, maxLength = 20}:{toAbbrev:string[], maxLength:number}) { 
  const predicate = (t:string, i:number, a:string[]) => { 
    const toReduce = [...a.slice(0,i)]; 
    return toReduce.join(', ').length < maxLength; 
  } 
  const reducable = toAbbrev.filter(predicate); 
  const reduced = reducable.join(', '); 
  const full = toAbbrev.map( (s, i) => `[${i}] ${s}`).join('\n'); 
  const ifLong = reducable.length < toAbbrev.length ? ', ...': ''; 
  const nSelected = ` (${toAbbrev.length}) `; 

  return <div title={full}>{nSelected + reduced + ifLong}</div>; 
}