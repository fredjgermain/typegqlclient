import React from 'react'; 

// import { useCached } from '../libs/dao/hooks/usecached'; 
// import { useFetcher } from '../libs/dao/hooks/usefetcher'; 
// import { useQueryMutator } from '../libs/dao/hooks/usequerymutator'; 


/*
in App.type.tsx 
  Rewrite Swicth, routing. 
  Rewrite preloading models and entries. 

Landing page 
Home page 

Rewrite Home page ...



*/


// export function TestModel({modelName}:{modelName:string}) { 
//   const { Model, Read } = useFetcher(); 
//   const { Model:CachedModel, Read:CachedRead } = useCached(); 
//   //const [model, {loading, error, data}] = Model; 

//   function TestCachedModel () { 
//     console.log(CachedModel(modelName)); 
//   } 

//   async function TestFetchModel() { 
//     const result = await Model(modelName); 
//     console.log(result); 
//   } 

//   return <div> 
//     <button onClick={TestCachedModel}> 
//       cached model - {modelName} 
//     </button> 
//     <button onClick={TestFetchModel}> 
//       fetch model - {modelName} 
//     </button> 
//   </div> 
// } 

// export function TestCrud({modelName}:{modelName:string}) { 
//   const { Model, Read } = useFetcher(); 
//   const { Model:CachedModel, Read:CachedRead } = useCached(); 
//   const data = CachedRead(modelName); 

//   async function TestFetchRead() { 
//     const result = await Read(modelName); 
//     console.log(result); 
//   } 

//   return <div> 
//     <div>
//       Data: 
//       {data && (data as any[]).map( d => { 
//         return <div> 
//           {JSON.stringify(d)} 
//         </div> 
//       })}
//     </div>
//     <button onClick={TestFetchRead}> 
//       {modelName}
//     </button>
//   </div>
// } 

