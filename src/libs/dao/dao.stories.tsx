import React, { useState, useContext, useEffect } from 'react'; 
import { Story } from '@storybook/react'; 
import { ApolloProvider, gql } from "@apollo/client"; 



// --------------------------------------------------------
import { client } from '../../libs/apolloclient'; 
import { Dao } from '../../libs/dao/dao.class'; 
import { ArgsIds, ArgsInputs, ArgsModelDescriptors, CrudResult, IError, ModelDescriptor } from './dao.utils';



export default { 
  title: 'DAO/modeldescriptor', 
  component: TemplateComponent, 
} 


function TemplateComponent() { 
  return <ApolloProvider {...{client}} > 
    <TestModel/> 
  </ApolloProvider> 
} 


const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestDAO = Template.bind({}) 


/* 
Fetch modeldescriptor 
display ifield accessors 
*/ 

//const dao = new Dao(client); 


function useDao(client:any) { 
  
  // Status
  type StatusType = { loading?: boolean; ready?: boolean; items?: IEntry[]; errors?: object[]; } 
  const defaultStatus = {loading:false, ready:false, items:[] as IEntry[], errors:[] as IError[]}; 
  const [status, setStatus] = useState(defaultStatus); 

  function SetStatus(_status:StatusType) { 
    setStatus((prev:any) => { return {...prev, ..._status} }) 
  }

  const dao = new Dao(client); 

  function ModelDescriptors(args:ArgsModelDescriptors) { 
    Fetch(dao.fetcher.ModelDescriptors(args)); 
  }; 

  function Create(args:ArgsInputs) { 
    Fetch(dao.fetcher.Create(args)); 
  }; 

  function Read(args:ArgsIds) { 
    Fetch(dao.fetcher.Read(args)); 
  }; 

  function Update(args:ArgsInputs) { 
    Fetch(dao.fetcher.Update(args)); 
  }; 

  function Delete(args:ArgsIds) { 
    Fetch(dao.fetcher.Delete(args)); 
  }; 

  

  function Fetch(promise:Promise<any>) { 
    SetStatus({loading:true}) 
    promise.then( items => SetStatus( {loading:false, ready:true, items}) ) 
      .catch(errors => { 
        //console.log(errors); 
        SetStatus( {loading:false, ready:false, errors})
      }) 
  }

  return {status, ModelDescriptors, Create, Read, Update, Delete} 
}


function TestModel() { 
  console.log('GetModel'); 
  const {status:{ready, items}, ModelDescriptors} = useDao(client); 

  const args = {modelsName:['Form']} as ArgsModelDescriptors; 
  useEffect(() => { ModelDescriptors(args) }, []); 

  return <div> 
    {items?.map( model => {
      return <div key={model._id}> 
          {model.accessor} {model.label[0]} {model.description[0]} 
          {JSON.stringify( (model as ModelDescriptor).ifields.map( field => field.accessor) )} 
        </div>
    })}
    {ready && <TestRead/>} 
  </div> 
} 



function TestCreate() { 
  console.log('TestCreate'); 
  const {status:{ready, items}, Create} = useDao(client); 
  const inputs = [
    {fid: 'testFid', title:['testTitle'], description:['testDescriptions']} 
  ]
  const args = {modelName:"Form", inputs} as ArgsInputs; 
  useEffect(() => { Create(args) }, []); 

  const toUpdate:IEntry = ready ? items[items.length-1]: {_id:''} as IEntry; 

  return <div> 
    CREATE ++++++++++++++++++++
    {items?.map( ({_id, ...entry}:any) => { 
      return <DisplayEntry key={_id} {...entry} /> 
    })} 
    {ready && <TestUpdate {...{entry: toUpdate}}/>} 
  </div> 
}



function TestRead() { 
  console.log('TestRead'); 
  const {status:{ready, items}, Read} = useDao(client); 
  const args = {modelName:"Form"} as ArgsIds; 
  useEffect(() => { Read(args) }, []); 

  return <div> 
    READ ++++++++++++++++++++
    {items?.map( ({_id, ...entry}:any) => { 
      return <DisplayEntry key={_id} {...entry} /> 
    })} 
    {ready && <TestCreate />}
  </div> 
}



function TestUpdate({entry}:{entry:IEntry}) { 
  console.log('TestUpdate'); 
  const {status:{ready, items, errors}, Update} = useDao(client); 
  const inputs = [{...entry, ...{fid:'modFid'}}]; 
  //console.log(entry);
  const args = {modelName:"Form", inputs} as ArgsInputs; 
  useEffect(() => { Update(args) }, []); 

  return <div> 
    UPDATE ++++++++++++++++++++
    {items?.map( ({_id, ...entry}:any) => { 
      return <DisplayEntry key={_id} {...entry} /> 
    })} 
    {ready && <TestDelete {...{entry}}/>} 
  </div> 
}



function TestDelete({entry}:{entry:IEntry}) { 
  console.log('TestDelete'); 
  const {status:{ready, items}, Delete} = useDao(client); 
  const ids = [entry._id]; 
  //console.log(entry);
  const args = {modelName:"Form", ids} as ArgsIds; 
  useEffect(() => { Delete(args) }, []); 

  return <div> 
    DELETE ++++++++++++++++++++
    {items?.map( ({_id, ...entry}:any) => { 
      return <DisplayEntry key={_id} {...entry} /> 
    })} 
  </div> 
}





function DisplayEntry(entry:any) { 
  return <div> 
    -----------------
    {Object.keys(entry).map( field => { 
      return <div key={field}>{field} : {entry[field]}</div> 
    })} 
  </div> 
} 


// function TestCreate() { 
//   const [ready, setReady] = useState( false ); 
//   const forms = ready ? dao.cacher.Read({modelName:'Form'}) : []; 

//   function Fetch() { 
//     dao.fetcher.Read({modelName:'Form'}) 
//       .then( res => setReady(true) ) 
//       .catch( err => setReady(false) ) 
//   } 

//   useEffect(() => { Fetch() }, []); 

//   return <div> 
//     {forms?.map( ({_id, ...entry}:any) => { 
//       return <DisplayEntry key={_id} {...entry} /> 
//     })} 
//   </div> 
// }

