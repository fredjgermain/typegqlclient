// -------------------------------------------------------- 
import { useFetcher } from '../hooks/usefetcher/usefetcher.hook'; 
import { Dao } from './dao.class'; 
import { ArgsIds, ArgsInputs, ArgsModelDescriptors } from './dao.utils'; 



export function useDao(client:any) { 
  const dao = new Dao(client); 
  const {status, Fetch} = useFetcher(); 


  // Fetch functions ................................
  async function ModelDescriptors(args:ArgsModelDescriptors) { 
    await Fetch(async () => dao.fetcher.ModelDescriptors(args)); 
  }; 

  async function Create(args:ArgsInputs) { 
    await Fetch(async () => dao.fetcher.Create(args)); 
  }; 

  async function Read(args:ArgsIds) { 
    await Fetch(async () => dao.fetcher.Read(args)); 
  }; 

  async function Update(args:ArgsInputs) { 
    await Fetch(async () => dao.fetcher.Update(args)); 
  }; 

  async function Delete(args:ArgsIds) { 
    await Fetch(async () => dao.fetcher.Delete(args)); 
  }; 

  const cacher = dao.cacher; 
  const fetcher = {ModelDescriptors, Create, Read, Update, Delete} 

  return {status, cacher, fetcher} 
}


// export function useDao(client:any) { 
//   const dao = new Dao(client); 

//   // Status
//   type StatusType = { loading?: boolean; ready?: boolean; items?: IEntry[]; errors?: object[]; } 
//   const defaultStatus = {loading:false, ready:false, items:[] as IEntry[], errors:[] as IError[]}; 
//   const [status, setStatus] = useState(defaultStatus); 

//   function SetStatus(_status:StatusType) { 
//     setStatus((prev:any) => { return {...prev, ..._status} }) 
//   }

//   function ModelDescriptors(args:ArgsModelDescriptors) { 
//     Fetch(dao.fetcher.ModelDescriptors(args)); 
//   }; 

//   function Create(args:ArgsInputs) { 
//     Fetch(dao.fetcher.Create(args)); 
//   }; 

//   function Read(args:ArgsIds) { 
//     Fetch(dao.fetcher.Read(args)); 
//   }; 

//   function Update(args:ArgsInputs) { 
//     Fetch(dao.fetcher.Update(args)); 
//   }; 

//   function Delete(args:ArgsIds) { 
//     Fetch(dao.fetcher.Delete(args)); 
//   }; 


//   function Fetch(promise:Promise<any>) { 
//     SetStatus({loading:true}) 
//     promise.then( items => SetStatus( {loading:false, ready:true, items}) ) 
//       .catch(errors => { 
//         //console.log(errors); 
//         SetStatus( {loading:false, ready:false, errors})
//       }) 
//   }

//   return {status, ModelDescriptors, Create, Read, Update, Delete} 
// }
