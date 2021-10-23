import React from 'react'; 

// TABLE -----------------------------------------------------
export const TableContext = React.createContext({} as any); 
interface ITable { 
  Key?:React.Key, 
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


// ROWS -----------------------------------------------------
export const RowsContext = React.createContext({} as {rows:React.Key[]}) 
export function Rows({rows, children}:React.PropsWithChildren<{rows:React.Key[]}>) { 
  return <RowsContext.Provider value={{rows}}> 
    {rows.map( (row, index) => { 
      return <Row key={row} {...{index, row}}>{children}</Row> 
    })} 
  </RowsContext.Provider> 
} 


type TRow = {index?:number, row:React.Key} 
export const RowContext = React.createContext({} as TRow) 
export function Row({index, row, children}:React.PropsWithChildren<TRow>) { 
  return <tr><RowContext.Provider value={{index, row}}> 
    {children} 
  </RowContext.Provider></tr> 
}


// COLS -----------------------------------------------------
export const ColsContext = React.createContext({} as {cols:React.Key[]}) 
export function Cols({cols, children}:React.PropsWithChildren<{cols:React.Key[]}>) { 
  return <ColsContext.Provider value={{cols}}> 
    {cols.map( (col, index) => { 
      return <Col key={col} {...{index, col}}>{children}</Col> 
    })} 
  </ColsContext.Provider> 
} 

type TCol = {index?:number, col:React.Key} 
export const ColContext = React.createContext({} as TCol) 
export function Col({index, col, children}:React.PropsWithChildren<TCol>) { 
  return <td><ColContext.Provider value={{index, col}}> 
    {children} 
  </ColContext.Provider></td> 
} 


// HEADS -----------------------------------------------------
export const THeadsContext = React.createContext({} as {cols:React.Key[]}) 
export function THeads({cols, children}:React.PropsWithChildren<{cols:React.Key[]}>) { 
  return <THeadsContext.Provider value={{cols}}> 
    {cols.map( (col, index) => { 
      return <THead key={col} {...{index, col}}>{children}</THead> 
    })} 
  </THeadsContext.Provider> 
} 

export const THeadContext = React.createContext({} as TCol) 
export function THead({index, col, children}:React.PropsWithChildren<TCol>) { 
  return <th><THeadContext.Provider value={{index, col}}> 
    {children} 
  </THeadContext.Provider></th> 
}
