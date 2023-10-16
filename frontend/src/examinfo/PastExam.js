import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '../table/Table';
import TableRow from '../table/TableRow';
import TableColumn from '../table/TableColumn';
import TopBar from '../header/TopBar';
// import TableColumnNo from '../table/TableColumNo';

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
      <TableColumn><Link to={`/detailExam/${item.id}`}>{item.title}</Link></TableColumn>
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
      <h2>시험 목록</h2>
      <Table headerName={['No.', '시험 제목', '게시 일자']}>
        {item}
      </Table>
    </div>
  );
}

export default PastExam;