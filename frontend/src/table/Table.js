import React from 'react';
import './Table.css';

const Table = props => {
  const { headerName, children } = props;

  return (
    <table className='common-table'>
      <thead>
        <tr>
          {
            headerName.map((item, index) => {
              return(
                <td className='common-table-header-column' key={index}>{item}</td>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          children
        }
      </tbody>
    </table>
  )
}

export default Table;