import { useContext } from 'react'; 


// -------------------------------------------------------------------- 
import { InputSelect } from '../../../libs/inputs'; 
import { PageOfPages, PagerBtns, usePager } from '../../../libs/pager'; 

import style from '../../../css/main.module.css'; 

import { Table, THeads, THead, Rows, Row, Cols, Col } 
    from '../../../libs/table/_table'; 
import { useColumnSelector } from '../../../libs/customhooks/usecolumnselector.hook'; 
import { CrudEntryContext } from '../../../libs/crudentry'; 
import { BtnSelectEntry, Cell, Head } from './crudtable_elements.components'; 


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
    <h4 className={style.instruction}>Select the </h4> 
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

