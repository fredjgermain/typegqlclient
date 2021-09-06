import { useEffect } from 'react'; 
import { Story } from '@storybook/react'; 
import { ApolloProvider } from "@apollo/client"; 



// --------------------------------------------------------
import { client } from '../../apolloclient'; 
import { useDao } from './usedao.hook'; 
import { ArgsIds, ArgsInputs, ArgsModelDescriptors, ModelDescriptor } from './dao.utils'; 



export default { 
  title: 'DAO/dao', 
  component: TemplateComponent, 
} 


function TemplateComponent() { 
  return <ApolloProvider {...{client}} > 
    <TestModel/> 
  </ApolloProvider> 
} 


const Template:Story<any> = (args) => <TemplateComponent {...args} /> 

export const TestDAO = Template.bind({}) 



function TestModel() { 
  console.log('GetModel'); 
  const {status:{ready, result }, fetcher:{ModelDescriptors}} = useDao(client); 

  const args = {modelsName:['Form']} as ArgsModelDescriptors; 
  useEffect(() => { ModelDescriptors(args) }, []); 

  return <div> 
  {result?.map( (model:IEntry) => {
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
  const {status:{ready, result}, fetcher:{Create}} = useDao(client); 
  const inputs = [
    {fid: 'testFid', title:['testTitle'], description:['testDescriptions']} 
  ]
  const args = {modelName:"Form", inputs} as ArgsInputs; 
  useEffect(() => { Create(args) }, []); 

  const toUpdate:IEntry = ready ? result[result.length-1]: {_id:''} as IEntry; 

  return <div> 
    CREATE ++++++++++++++++++++
    {result?.map( ({_id, ...entry}:IEntry) => { 
      return <DisplayEntry key={_id} {...entry} /> 
    })} 
    {ready && <TestUpdate {...{entry: toUpdate}}/>} 
  </div> 
}



function TestRead() { 
  console.log('TestRead'); 
  const {status:{ready, result}, fetcher:{Read}} = useDao(client); 
  const args = {modelName:"Form"} as ArgsIds; 
  useEffect(() => { Read(args) }, []); 

  return <div> 
    READ ++++++++++++++++++++
    {result?.map( ({_id, ...entry}:IEntry) => { 
      return <DisplayEntry key={_id} {...entry} /> 
    })} 
    {ready && <TestCreate />}
  </div> 
}



function TestUpdate({entry}:{entry:IEntry}) { 
  console.log('TestUpdate'); 
  const {status:{ready, result, error}, fetcher:{Update}} = useDao(client); 
  const inputs = [{...entry, ...{fid:'modFid'}}]; 
  //console.log(entry);
  const args = {modelName:"Form", inputs} as ArgsInputs; 
  useEffect(() => { Update(args) }, []); 

  return <div> 
    UPDATE ++++++++++++++++++++
    {result?.map( ({_id, ...entry}:IEntry) => { 
      return <DisplayEntry key={_id} {...entry} /> 
    })} 
    {ready && <TestDelete {...{entry}}/>} 
  </div> 
}



function TestDelete({entry}:{entry:IEntry}) { 
  console.log('TestDelete'); 
  const {status:{ready, result}, fetcher:{Delete}} = useDao(client); 
  const ids = [entry._id]; 
  //console.log(entry);
  const args = {modelName:"Form", ids} as ArgsIds; 
  useEffect(() => { Delete(args) }, []); 

  return <div> 
    DELETE ++++++++++++++++++++
    {result?.map( ({_id, ...entry}:IEntry) => { 
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

