import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './table/Table';
import TableRow from './table/TableRow';
import TableColumn from './table/TableColumn';

import TopBar from './TopBar';

function GetData() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get('http://localhost:8000/api/lists').then((response) => {
      setData(response.data);
    })
  }, []);

  const item = (Object.values(data)).map((item) => (
    <TableRow key={item.id}>
      <TableColumn>{item.id}</TableColumn>
      <TableColumn>{item.title}</TableColumn>
      <TableColumn>{item.createdAt}</TableColumn>
      {/* <TableColumn>{item.id}</TableColumn> */}
    </TableRow>
  ));

  return item;
}

const PastExam = props => {
  // const {headernames, children} = props;
  const item = GetData();

  return(
    <div>
      <TopBar />
      <Table headerName={['No.', '시험 제목', '게시 일자']}>
        {item}
      </Table>
    </div>
  );
}

export default PastExam;