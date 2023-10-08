import React from 'react';

const TableRow = ({children}) => {
  return (
    <td className='common-table-row'>
      {
        children
      }
    </td> 
  )
}

export default TableRow;