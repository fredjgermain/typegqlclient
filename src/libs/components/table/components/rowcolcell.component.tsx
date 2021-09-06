import React from 'react'; 


export const TableContext = React.createContext({} as any); 
interface ITable { 
  Key:React.Key, 
  contextValue?:any, 
  tableAttribute?:React.TableHTMLAttributes<HTMLTableElement>, 
} 
export function Table({Key, contextValue, tableAttribute, children}: React.PropsWithChildren<ITable>) { 
  return <TableContext.Provider value={contextValue} >
    <table key={Key} {...tableAttribute}> 
      {children} 
    </table> 
  </TableContext.Provider>
} 


export const RowsContext = React.createContext({} as {rows:React.Key[]}) 
export function Rows({rows, children}:React.PropsWithChildren<{rows:React.Key[]}>) { 
  return <RowsContext.Provider value={{rows}}> 
    {rows.map(row => { 
      return <Row key={row} row={row}>{children}</Row> 
    })} 
  </RowsContext.Provider> 
} 


export const RowContext = React.createContext({} as {row:React.Key}) 
export function Row({row, children}:React.PropsWithChildren<{row:React.Key}>) { 
  return <tr><RowContext.Provider value={{row}}> 
    {children} 
  </RowContext.Provider></tr> 
}


export const ColsContext = React.createContext({} as {cols:React.Key[]}) 
export function Cols({cols, children}:React.PropsWithChildren<{cols:React.Key[]}>) { 
  return <ColsContext.Provider value={{cols}}> 
    {cols.map(col => { 
      return <Col key={col} col={col}>{children}</Col> 
    })} 
  </ColsContext.Provider> 
} 


export const ColContext = React.createContext({} as {col:React.Key}) 
export function Col({col, children}:React.PropsWithChildren<{col:React.Key}>) { 
  return <td><ColContext.Provider value={{col}}> 
    {children} 
  </ColContext.Provider></td> 
} 

/*
export const CellContext = React.createContext({} as {row:string, col:string}) 
export function Cell({children}:React.PropsWithChildren<any>) { 
  const {row} = useContext(RowContext); 
  const {col} = useContext(ColContext); 
  return <CellContext.Provider value={{row, col}}> 
    {children} 
  </CellContext.Provider> 
} 
*/