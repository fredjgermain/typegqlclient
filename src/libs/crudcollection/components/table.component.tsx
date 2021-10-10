import React, { useContext } from 'react'; 


// -------------------------------------------------------------------- 
import { EnumCrud } from '../../dao/dao.class'; 
import { FieldReader } from '../../entryreadereditor/fieldreader.component';
import { InputSelect } from '../../inputs'; 
import { PageOfPages, PagerBtns, usePager } from '../../pager'; 

import { Table, 
  THeads, THead, THeadContext, 
  Rows, Row, RowContext, 
  Cols, Col, ColContext } 
    from '../../table/_table'; 
import { useColumnSelector } from '../hooks/usecolumnselector.hook'; 
import { ModelSelectorContext } from '../hooks/usemodelselector.hook';
import { EntrySelectorContext } from '../hooks/useentryselector';



/** CrudCollectionTable =================================== 
 * 
 * @returns 
 */ 
export function CrudCollectionTable() { 
  const modelSelectorContext = useContext(ModelSelectorContext); 
  const { modelData:{entries, model} } = modelSelectorContext; 

  // Pager ................................................
  const pager = usePager(entries, 2); 
  const rows = (pager.page as IEntry[]).map( e => e._id ); 

  // Columns ..............................................
  const {colSelection:cols, SetColSelection, options} = useColumnSelector(model.ifields); 

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
  const modelSelectorContext = useContext(ModelSelectorContext); 
  const { SetSelectedEntry: SetSelectEntry } = useContext(EntrySelectorContext); 
  const { modelData:{entries, defaultEntry} } = modelSelectorContext; 
  const {row} = useContext(RowContext); 
  const entry = entries.find( e => e._id === row ) ?? defaultEntry; 

  function Select(action:EnumCrud) { 
    SetSelectEntry({entry, action}) 
  } 
  
  return <span> 
    <button onClick={() => Select(EnumCrud.Update)}>Update</button> 
    <button onClick={() => Select(EnumCrud.Delete)}>Delete</button> 
  </span>
} 



function Head() { 
  const modelSelectorContext = useContext(ModelSelectorContext); 
  const { modelData:{model} } = modelSelectorContext; 
  const {col} = useContext(THeadContext); 
  const ifield = model.ifields.find( f => f.accessor === col) ?? {} as IField; 
  const label = ifield?.label ?? ifield.accessor; 

  return <span>{JSON.stringify(label)}</span> 
} 



function Cell() { 
  const {modelData:{model, entries, ifieldsOptions}} = useContext(ModelSelectorContext); 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const entry = (entries.find( entry => entry._id === row ) ?? {}) as IEntry; 
  const ifield = model.ifields.find( f => f.accessor === col) ?? {} as IField; 
  const options = ifieldsOptions[ifield.accessor]; 

  return <FieldReader {...{entry, ifield, options}} /> 
} 


