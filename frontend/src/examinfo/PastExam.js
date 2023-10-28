import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '../table/Table';
import TableRow from '../table/TableRow';
import TableColumn from '../table/TableColumn';
// import TopBar from '../header/TopBar';
// import TableColumnNo from '../table/TableColumNo';
import '../dist/css/bootstrap.min.css';

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
    <>
    <header className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
          {/* <li className="nav-item"><a href="#" className="nav-link">Home</a></li> */}
        <li className="nav-item"><Link to='/main' className='nav-link'>Home</Link></li> 
        <li className="nav-item"><Link to='/createExam' className="nav-link">시험 생성하기</Link></li>
        <li className="nav-item"><Link to='/callPastExam' className="nav-link active" aria-current="page">시험 불러오기</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link">FAQ</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link">About</Link></li>
      </ul>
    </header>
    <div className='container'>
      {/* <TopBar /> */}
      <div className="py-5 text-center">
        <h2>시험 목록</h2>
        <p className="lead">이전에 생성되었던 시험 목록입니다</p>
      </div>
      <Table headerName={['No.', '시험 제목', '게시 일자']}>
        {item}
      </Table>
    </div>
    </>
  );
}

export default PastExam;