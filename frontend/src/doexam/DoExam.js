import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Table from '../table/Table';
// import TableRow from '../table/TableRow';
// import TableColumn from '../table/TableColumn';
// import TopBar from '../header/TopBar';
// import TableColumnNo from '../table/TableColumNo';
// import JumboTron from '../header/JumboTron';
import '../dist/css/bootstrap.min.css';
import Album from '../header/Album';
import Footer from '../header/Footer';
import { Container, ListGroup, Card, Form, Button } from 'react-bootstrap';


function GetData() {
  const [data, setData] = useState({ examName: '', questions: [] });
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const examNo = url.pathname.split('/').pop();

  useEffect(() => {
    axios.get('http://localhost:8000/api/exam/'+examNo)
    .then((response) => {
      if(response.status !== 200) {
        throw new Error('Network response was not ok');
      } else {
        console.log(response.data);
        setData(response.data);
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }, []);
  
  return data;
}

function handleSubmit() {
  return 0;
}

const DoExam = props => {
  // const {headernames, children} = props;
  const items = GetData();
  console.log(items);

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
    {/* <div className='container'>
      <div className="py-5 text-center">
        <h2>{items.examName}</h2>
      </div>
      <div className="album py-5 bg-body-tertiary">
          {items.questions.map((question, index) => (
            <li key={index}>
              <h5>문제 {index + 1}</h5>
              <p>{question}</p>
              <textarea placeholder="여기에 답을 입력하세요" rows="4" cols="50" />
            </li>
        ))}
      </div>
      <Footer/>
    </div> */}
    <Container>
    <Card>
      <Card.Header>
        <h2 className="text-center mt-2 mb-2">{items.examName}</h2>
      </Card.Header>
      <ListGroup variant="flush">
        {items.questions.map((question, index) => (
          <ListGroup.Item key={index}>
            <Card.Text className="mt-1">문제 {index + 1}</Card.Text>
            <Card.Text style={{ fontSize: '1.5rem' }} >{question}</Card.Text>
            <Form.Control as="textarea" placeholder="여기에 답을 입력하세요" rows="4" className="mb-2"/>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Footer className="text-center">
          <Button variant="primary" className="w-100">제출하기</Button>
        </Card.Footer>
    </Card>
    <Footer />

   </Container>
  </>
    

  );
}

export default DoExam;