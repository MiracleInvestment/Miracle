import { Link } from 'react-router-dom';
import { Container } from './Styled';
import {useState, useEffect} from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import Table from './table/Table';
import TableRow from './table/TableRow';
import TableColumn from './table/TableColumn';


// import Home from './Home';
// import Image from './assets/sunset.jpg';


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


function Result() {
  // const item = GetData();

  return (
    <div>
      
      <TopBar />
        <h1>채점 결과</h1>
        <Table headerName={["No.", "이름", "점수"]}>
          <TableRow key = {1}>
          </TableRow>
        </Table>

        <h2>엑셀로 다운로드</h2> 
        <button>다운로드</button>
    </div>
  );
}

export default Result;
