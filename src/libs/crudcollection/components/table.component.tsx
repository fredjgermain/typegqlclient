import React, { useContext } from 'react'; 


// -------------------------------------------------------------------- 
import { EnumCrud } from '../../dao/dao.class'; 
import { InputSelect } from '../../inputs'; 
import { PageOfPages, PagerBtns, usePager } from '../../pager'; 

import { Table, 
  THeads, THead, 
  Rows, Row, RowContext, 
  Cols, Col, ColContext, THeadContext } from '../../table/_table'; 
import { IsEmpty, ToArray } from '../../utils'; 
import { CrudCollectionContext } from '../crudcollection.component'; 
import { useColumnSelector } from '../hooks/usecolumnselector.hook'; 



/** CrudCollectionTable =================================== 
 * 
 * @returns 
 */ 
export function CrudCollectionTable() { 
  const crudcollectionContext = useContext(CrudCollectionContext); 
  const { data:{entries, model} } = crudcollectionContext; 

  // Pager ................................................
  const pager = usePager(entries, 2); 
  const rows = (pager.page as IEntry[]).map( e => e._id ); 

  // Columns ..............................................
  const {colSelection:cols, SetColSelection, options} = useColumnSelector(model); 

  return <div> 
    <InputSelect {...{value:cols, SetValue:SetColSelection, options, multiple:true}} /> 
    <Table {...{Key:model.accessor}} > 
      <thead> 
        <Row {...{row:''}} > 
          <THeads {...{cols}}><Head/></THeads> 
          <THead {...{col:'Btn'}}>BTN</THead> 
        </Row> 
      </thead> 
      <tbody> 
        <Rows {...{rows}} > 
          <Cols {...{cols}}><Cell/></Cols> 
          <Col {...{col:'Btn'}}> 
            <BtnSelectEntry/> 
          </Col> 
        </Rows> 
      </tbody> 
    </Table> 
    <PageOfPages {...pager} /> 
    <PagerBtns {...pager} /> 
  </div> 
} 



function BtnSelectEntry() { 
  const {SetData, data:{entries, defaultEntry}} = useContext(CrudCollectionContext); 
  const {row} = useContext(RowContext); 
  const entry = entries.find( e => e._id === row ) ?? defaultEntry; 

  function Select(mode:EnumCrud) { 
    SetData({entry, mode}) 
  } 
  
  return <span> 
    <button onClick={() => Select(EnumCrud.Update)}>Update</button> 
    <button onClick={() => Select(EnumCrud.Delete)}>Delete</button> 
  </span>
} 


function Head() { 
  const {data:{model}} = useContext(CrudCollectionContext); 
  const {index} = useContext(THeadContext); 
  const ifield = model.ifields[index ?? 0]; 
  const label = ifield?.label[0] ?? ifield.accessor; 

  return <span>{label}</span> 
} 



function Cell() { 
  const {data:{model, entries, ifieldsOptions}} = useContext(CrudCollectionContext); 
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
