import { useState } from 'react'; 

// -------------------------------------------------------- 
import { Input } from '../input/input.component'; 


export function InputFilter({type, onFilter}:{type:string, onFilter: (newFilter:any) => void}) { 
  const [strFilter, setStrFilter] = useState(''); 
  const value = strFilter; 
  const onSetValue = (newValue:string) => { 
    setStrFilter(newValue); 
  }; 

  const onPressEnter = () => { 
    const newFilter = onFilter(strFilter); 
  }; 

  const style = { 
    borderRadius: '0.2em', 
    border: '1px solid black', 
    padding: '0.2em', 
    paddingBottom: '0.3em' 
  } 

  const _type = type === 'date' ? type: 'string'; 
  return <span style={style}> 
    <Input {...{type:_type, value, onSetValue, onPressEnter}} />🔍
  </span>
} 

/*
function InputEquation() { 
  const [ops, setOps] = useState(['']); 

  return <div> 
    {ops.map( op => { 

    })} 
    SelectOperator 
  </div> 
} 

function InputOperand() { 

} 

function SelectOperator() { 
  const [operator, setOperator] = useState('==='); 
  const value = operator; 
  const onSetValue = (newOperator:any[]) => { 
    setOperator(newOperator as any); 
  }; 


  const options = [ 
    // comparator operators 
    {label: '=', value:'==='}, 
    {label: '>', value:'>'}, 
    {label: '>=', value:'>='}, 
    {label: '<', value:'<'}, 
    {label: '<=', value:'<='}, 
    {label: '!=', value:'!='}, 

    // arithmethic operators 
    {label: '+', value:'+'}, 
    {label: '-', value:'-'}, 
    {label: 'x', value:'*'}, 
    {label: '/', value:'/'}, 
    {label: 'x', value:'*'}, 
    {labe: 'modulo', value: '%'}, 
  ] as IOption[]; 

  return <InputSelect {...{value, onSetValue, options}} />
} 
*/