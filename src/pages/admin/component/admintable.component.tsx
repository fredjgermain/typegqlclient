import React, { useContext } from 'react'; 



// -------------------------------------------------------------------- 
import { Table, RowContext, Rows, Row, ColContext, Cols, Col } 
  from '../../../libs/table/_table'; 
//import { Input, InputArray, InputSelect } from '../../../libs/inputs'; 
import { ModelDescriptor } from '../../../libs/dao/dao.utils'; 

import { FetcherContext } from '../../../libs/fetcher/fetcher.components'; 
import { IsEmpty, ToArray } from '../../../libs/utils'; 
import { AdminContext } from '../admin.page'; 
import { EditBtns, IUseEdition, useEditEntry } 
  from './editionbtn.component'; 
import { Editor } from './editor.component';


export interface IAdminTableContext {
  model:ModelDescriptor, 
  entries:IEntry[], 
  defaultEntry:IEntry, 
  ifieldsOptions:{[accessor:string]:IOption[]}, 
  useedition:IUseEdition, 
} 

export const AdminTableContext = React.createContext({} as IAdminTableContext); 

export function AdminTable() { 
  const {collectionAccessor} = useContext(AdminContext); 
  const result = useContext(FetcherContext); 
  const useedition = useEditEntry(); 
  
  const admintablecontext = {...(result ?? {}), useedition} as IAdminTableContext; 
  const {model, entries} = admintablecontext; 

  const rows = entries.map( entry => entry._id ); 
  const cols = model.ifields.map( f => f.accessor ).filter( f => !f.includes('_') ); 

  return <AdminTableContext.Provider value={admintablecontext} > 
    <Editor />
    <DisplayModel {...{model}} /> 
    <Table {...{Key:collectionAccessor}} > 
      <thead> 
        <Row {...{row:''}} > 
          <Cols {...{cols}}><Head/></Cols> 
          <Col {...{col:'Btn'}}>BTN</Col> 
        </Row> 
      </thead> 
      <tbody> 
        <Rows {...{rows}} > 
          <Cols {...{cols}}><Cell/></Cols> 
          <Col {...{col:'Btn'}}> 
            <EditBtns {...{mode:'update'}}/> 
          </Col> 
        </Rows> 
      </tbody> 
    </Table> 
  </AdminTableContext.Provider>
}



function Head() { 
  const {model} = useContext(AdminTableContext); 
  const {index} = useContext(ColContext); 
  const ifield = model.ifields[index ?? 0]; 
  const label = ifield?.label[0]; 

  return <span>{label}</span> 
} 



function Cell() { 
  const {model, entries, ifieldsOptions} = useContext(AdminTableContext); 
  const {row} = useContext(RowContext); 
  const {col, index} = useContext(ColContext); 
  const entry = (entries.find( entry => entry._id === row ) ?? {}) as IEntry; 
  const value = entry[col]; 
  const ifield = model.ifields[index ?? 0]; 
  const options = ifieldsOptions[ifield.accessor]; 
  
  let _value = value; 
  if(ifield.isRef && ifield.type.isArray) { 
    _value = ToArray(value).map( v => { 
      return options.find( o => o.value === v._id) as IOption; 
    }).map( o => o.label ) 
  } 

  else if(ifield.isRef) 
    _value = options.find( o => o.value === value?._id)?.label; 
  
  return <span>{JSON.stringify(_value)}</span> 
}



function DisplayModel({model}:{model:ModelDescriptor}) { 
  if(IsEmpty(model)) 
    return <div></div> 
  return <div> 
    MODEL : {model?.label[0]} <br/> 
    {model?.description[0]} 
  </div> 
} 
