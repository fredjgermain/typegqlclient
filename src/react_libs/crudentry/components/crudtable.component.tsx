import { useContext } from 'react'; 


// -------------------------------------------------------------------- 
import { EnumCrud } from '../../../dao/dao.class'; 
import { DisplayField } from '../../inputs'; 
import { InputSelect } from '../../inputs'; 
import { PageOfPages, PagerBtns, usePager } from '../../pager'; 

import style from '../../../css/main.module.css'; 

import { Table, 
  THeads, THead, THeadContext, 
  Rows, Row, RowContext, 
  Cols, Col, ColContext } 
    from '../../table'; 
import { useColumnSelector } from '../../customhooks/usecolumnselector.hook'; 
import { Capitalize, Label } from '../../../utils/utils'; 
import { CrudEntryContext } from '../hooks/usecrudentry.hook';



/** CrudCollectionTable =================================== 
 * 
 * @returns 
 */ 
export function CrudTable() { 
  const {crudEntry:{model, entries}} = useContext(CrudEntryContext); 

  // Pager ................................................
  const pager = usePager(entries, 2); 
  const rows = (pager.page as IEntry[]).map( e => e._id ); 

  // Columns ..............................................
  const {colSelection:cols, SetColSelection, options} = useColumnSelector(model.ifields); 

  return <div> 
    <h4 className={style.instruction}>Select the columns you wish to display</h4> 
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
  const {crudEntry:{entries, defaultEntry}, SelectEntry} = useContext(CrudEntryContext); 
  const {row} = useContext(RowContext); 
  const entry = entries.find( e => e._id === row ) ?? defaultEntry; 

  function Select(action:EnumCrud) { 
    SelectEntry({entry, action}) 
  } 
  
  return <span> 
    <button onClick={() => Select(EnumCrud.Update)}>Update</button> 
    <button onClick={() => Select(EnumCrud.Delete)}>Delete</button> 
  </span> 
} 



function Head() { 
  const { crudEntry:{model} } = useContext(CrudEntryContext); 
  const {col} = useContext(THeadContext); 
  
  const ifield = model.ifields.find( f => f.accessor === col) ?? {} as IField; 
  const label = Label(ifield); 
  return <span>{Capitalize(label)}</span> 
} 



function Cell() { 
  const { crudEntry:{model, entries, ifieldsOptions} } = useContext(CrudEntryContext); 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  const entry = (entries.find( entry => entry._id === row ) ?? {}) as IEntry; 
  const ifield = model.ifields.find( f => f.accessor === col) ?? {} as IField; 
  const options = ifieldsOptions[ifield.accessor]; 

  return <DisplayField {...{entry, ifield, options}} /> 
} 


