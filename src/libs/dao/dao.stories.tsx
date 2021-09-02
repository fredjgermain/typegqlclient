import React, { useState, useContext, useEffect } from 'react'; 
import { Story } from '@storybook/react'; 
import { ApolloProvider, gql } from "@apollo/client"; 



// --------------------------------------------------------
import { Table, Rows, RowContext, Cols, ColContext, ColsContext } 
  from '../components/table/_table'; 
//import '../component/table/table.css'; 

import { client } from '../../libs/apolloclient'; 
import { Dao } from '../../libs/dao/dao.class'; 
import { IsEmpty, IsNull } from '../utils/value_type.utils';



export default { 
  title: 'DAO/modeldescriptor', 
  component: TemplateComponent, 
} 


function TemplateComponent() { 
  return <ApolloProvider {...{client}} > 
    <GetModel/> 
  </ApolloProvider> 
} 


const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestDAO = Template.bind({}) 

/* 
Fetch modeldescriptor 
display ifield accessors 

*/ 

const dao = new Dao(client); 


function GetModel() { 
  
  //console.log("Cacher", dao.cacher.ModelDescriptors) 
  const [ready, setReady] = useState( false ); 
  const models = ready ? dao.cacher.ModelDescriptors({modelsName:['Form']}) : []; 


  function Fetch() { 
    //console.log("Fetcher", dao.fetcher.ModelDescriptors) 
    dao.fetcher.ModelDescriptors({modelsName:['Form']}) 
      .then( res => setReady(true) ) 
      .catch( err => setReady(false) ) 
  } 

  useEffect(() => { Fetch() }, []); 

  return <div> 
    {models.map( model => {
      return <div key={model._id}> 
          {model.accessor} {model.label[0]} {model.description[0]} 
          {JSON.stringify( model.ifields.map( field => field.accessor) )} 
        </div>
    })}
  </div> 
} 



// function FetchModel() { 
//   const dao = new Dao(client); 
//   const [ready, setReady] = useState(false); 
//   const [fetch, setFetch] = useState([] as any[]); 
  
//   function Fetch() { 
//     dao.fetcher.ModelDescriptors({modelsName:['Form']}) 
//     .then( (res:any) => { 
//       //console.log("fetcher", res); 
//       setReady(true); 
//       setFetch(res); 
//     }) 
//     .catch( err => { 
//       //console.log("fetcher-error", err); 
//       setReady(false); 
//       setFetch(err); 
//     }) 
//   } 

//   useEffect(() => { Fetch() }, []); 

//   const toDisplay = ready ? fetch.map( model => model.accessor ) 
//     .reduce( (prev, curr, i) => i ? `${prev}, ${curr}`: `${curr}`, '') : ''; 
  
//   return <div> 
//     {ready ? '!!!': '...'} <br/> 
//     MODELDESCRIPTORS <br/> 
//     {`[${toDisplay}]`} <br/> 
//     --------------------------------------
//   </div> 
// }
