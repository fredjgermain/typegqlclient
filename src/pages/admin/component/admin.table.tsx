import React, { useState, useContext, useEffect } from 'react'; 



// --------------------------------------------------------------------
//import { client } from '../../apolloclient'; 
import { Table, TableContext, 
  RowContext, Rows, Row, 
  ColContext, Cols, Col 
  } from '../../../libs/components/table/_table'; 
import { client } from '../../../libs/dao/apolloclient'; 
import { Dao } from '../../../libs/dao/dao.class'; 
import { ModelDescriptor } from '../../../libs/dao/dao.utils'; 
import { FetcherComponent, FetcherContext } 
  from '../../../libs/fetcher/fetcher.components'; 
import { IsEmpty, ToArray } from '../../../libs/utils'; 
import { AdminContext } from '../admin.page'; 



type TTableContext = {model:ModelDescriptor, entries:IEntry[], introspection:any, options:{[accessor:string]:IOption[]} } 

export function AdminTable() { 
  const {collectionAccessor} = useContext(AdminContext); 
  const result = useContext(FetcherContext); 
  const contextValue = (result ?? {}) as TTableContext; 
  const {model, entries} = contextValue; 

  const rows = entries.map( entry => entry._id ); 
  const cols = model.ifields.map( f => f.accessor ).filter( f => !f.includes('_') ); 

  console.log('test');

  return <div> 
    <DisplayModel {...{model}} /> 
    <Table {...{Key:collectionAccessor, contextValue}} > 
      <thead> 
        <Row {...{row:''}} > 
          <Cols {...{cols}}><Head/></Cols> 
          <Col {...{col:'Btn'}}>BTN</Col> 
        </Row> 
      </thead> 
      <tbody> 
        <Rows {...{rows}} > 
          <Cols {...{cols}}><Cell/></Cols> 
          <Col {...{col:'Btn'}}><Btn/></Col> 
        </Rows> 
      </tbody> 
    </Table> 
  </div> 
}

function Head() { 
  const {model} = useContext(TableContext) as TTableContext; 
  const {index} = useContext(ColContext); 
  const ifield = model.ifields[index ?? 0]; 
  const label = ifield?.label[0]; 

  return <span>{label}</span> 
} 



function Cell() { 
  const {model} = useContext(TableContext) as TTableContext; 
  const {row} = useContext(RowContext); 
  const {col, index} = useContext(ColContext); 
  const ifield = model.ifields[index ?? 0]; 
  
  const fetchCallBack = { 
    fetchFunc: async () => await new Dao(client).fetcher.GetOptionsFromIField(ifield) 
  } 

  return <FetcherComponent key={model.accessor+row+col} {...{fetchCallBack}} > 
    <Reader/> 
  </FetcherComponent> 
}


function Reader() { 
  const {model, entries} = useContext(TableContext) as TTableContext; 
  const {row} = useContext(RowContext); 
  const {col, index} = useContext(ColContext); 
  const entry = (entries.find( entry => entry._id === row ) ?? {}) as IEntry; 
  const value = entry[col]; 
  const ifield = model.ifields[index ?? 0]; 
  const options = useContext(FetcherContext) as IOption[]; 

  let _value = value; 
  if(ifield.isRef && ifield.type.isArray) { 
    _value = ToArray(value).map( v => { 
      return options.find( o => o.value === v._id) as IOption; 
    }).map( o => o.label ) 
    //console.log(_value); 
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


function Btn() { 
  const {row} = useContext(RowContext); 
  return <button> 
    EDIT ... {row} 
  </button> 
}




// function Cell() { 
//   const {model, entries, introspection, options} = useContext(TableContext) as TTableContext; 
//   const {row} = useContext(RowContext); 
//   const {col} = useContext(ColContext); 

//   const entry = (entries.find( entry => entry._id === row ) ?? {}) as IEntry; 
//   const ifield = model.ifields.find( f => f.accessor === col ); 
//   const _options = options[col]; 
//   console.log(_options); 


//   // if value is array !!! 
//   const value = IsEmpty(_options) ? 
//     entry[col] : _options.find( o => o.value === entry[col]._id)?.label ?? entry[col]._id; 

//   return <span>{JSON.stringify(value)}</span> 
// } 
