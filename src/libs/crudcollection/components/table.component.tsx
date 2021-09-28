import React, { useContext } from 'react'; 
import { InputSelect } from '../../inputs';
import { PageOfPages, PagerBtns, usePager } from '../../pager';



// -------------------------------------------------------------------- 
import { Table, Rows, Row, RowContext, Cols, Col, ColContext } from '../../table/_table'; 
import { IsEmpty, ToArray } from '../../utils'; 
import { CrudCollectionContext } from '../crudcollection.component'; 
import { EnumMode } from '../hooks/crudcollection.hooks';
import { useColumnSelector } from '../hooks/usecolumnselector.hook';



/** CrudCollectionTable =================================== 
 * 
 * @returns 
 */ 
export function CrudCollectionTable() { 
  const crudcollectionContext = useContext(CrudCollectionContext); 
  const { data:{entries, model} } = crudcollectionContext; 

  // Pager ................................................
  const pager = usePager(entries, 10); 
  const rows = (pager.page as IEntry[]).map( e => e._id ); 

  // Columns ..............................................
  const initCols = (model.ifields ?? []).map( f => f.accessor ) 
    .filter( f => !f.includes('_') ); 
  const {colSelection:cols, SetColSelection} = useColumnSelector(initCols); 
  const options = initCols.map( col => { return {label:col, value:col } as IOption}) 


  return <div> 
    <InputSelect {...{value:cols, SetValue:SetColSelection, options, multiple:true}} /> 
    <Table {...{Key:model.accessor}} > 
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
  const {crud, SetCrud, data:{entries, defaultEntry}} = useContext(CrudCollectionContext); 
  const {row} = useContext(RowContext); 
  const entry = entries.find( e => e._id === row ) ?? defaultEntry; 

  function Select(mode:EnumMode) { 
    SetCrud({...crud, entry, mode}) 
  } 
  
  return <span> 
    <button onClick={() => Select(EnumMode.update)}>Update</button> 
    <button onClick={() => Select(EnumMode.delete)}>Delete</button> 
  </span>
} 


function Head() { 
  const {data:{model}} = useContext(CrudCollectionContext); 
  const {index} = useContext(ColContext); 
  const ifield = model.ifields[index ?? 0]; 
  const label = ifield?.label[0]; 

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



function DisplayModel() { 
  const {data:{model}} = useContext(CrudCollectionContext); 
  if(IsEmpty(model)) 
    return <div></div> 
  return <div> 
    MODEL : {model?.label[0]} <br/> 
    {model?.description[0]} 
  </div> 
} 
