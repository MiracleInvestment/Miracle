import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../dist/css/bootstrap.min.css';
import Footer from '../header/Footer';
import Header from '../header/Header3';
import moment from 'moment';
import { Container, ListGroup, Card, Form, Button } from 'react-bootstrap';


function GetData({id}) {
  const [data, setData] = useState([]);
  // const currentURL = window.location.href;
  // const url = new URL(currentURL);
  // const examNo = url.pathname.split('/').pop();
  const uri = `http://localhost:8000/exam/${id}/getExam`;

  useEffect(() => {
    axios.get(uri)
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

function GetQuestionData({id}) {
  const [data, setData] = useState([]);
  // const currentURL = window.location.href;
  // const url = new URL(currentURL);
  // const examNo = url.pathname.split('/').pop();
  const uri = `http://localhost:8000/exam/${id}/getQuestions`;

  useEffect(() => {
    axios.get(uri)
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

const DoExam = ({id}) => {
  // const {headernames, children} = props;
  const params = useParams();
  const exam = GetData({id: params.id});
  const questions = GetQuestionData({id: params.id});

  const date2 = moment(exam.ExamStartDate).format('YYYY-MM-DD');
  // console.log(items);

  return(
    <>
    <Header />
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
    <div className="containerScoring">
      {/* <div className="py-2 text-center">
        <p>학생정보 입력하는 곳.. </p>
      </div> */}
        {/* 시험 이름, 날짜, 응시인원도 db 에서 불러오는 거로 변경해야 함 */}
        {/* <div className='container'>
          <h1 className="text-body-emphasis">{exam.ExamName}</h1>
        </div> */}
      <div className="py-5 text-center">
        <h1>{exam.ExamName}</h1>
        <div className='mt-4'><span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{date2}에 생성됨</span></div>
        <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill">현재 39명 응시</span>
      </div>
      <Card>
        <Card.Header>
          <h5 className="text-center mt-2 mb-2">학생 인적사항 입력하는 곳으로..</h5>
        </Card.Header>
        <ListGroup variant="flush">
              {/* {items.questions.map((question, index) => (
                <ListGroup.Item key={index}>
                  <Card.Text className="mt-1">문제 {index + 1}</Card.Text>
                  <Card.Text style={{ fontSize: '1.5rem' }} >{question}</Card.Text>
                  <Form.Control as="textarea" placeholder="여기에 답을 입력하세요" rows="4" className="mb-2"/>
                </ListGroup.Item>
              ))} */}
          {(Object.values(questions)).map((question, index) => (
            <ListGroup.Item key={index}>
              <Card.Text className="mt-1">문제 {index + 1}</Card.Text>
              <Card.Text style={{ fontSize: '1.5rem' }} >{question.QuestionText}</Card.Text>
              <Form.Control as="textarea" placeholder="여기에 답을 입력하세요" rows="4" className="mb-2"/>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Footer className="text-center">
          <Button variant="primary" className="w-100">제출하기</Button>
        </Card.Footer>
      </Card>
    <Footer />

   </div>
  </>
    

  );
}

const Intro = () => {
  // const questionInfo = "시험에 출제할 문제를 입력해주세요.Ex)";
  return (
    <div className="col-md-4 col-lg-4 order-md-last">
      {/* <div className="py-5"></div> */}
      <h4 className="d-flex justify-content-between align-items-cneter mb-3">
          <span className='text-primary'>상세 설명</span>
      </h4>
      <ul className='list-group mb-3'>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>응시 번호</h6>
            <small className='text-body-secondary'>부여받은 고유 응시 번호를 입력해주세요</small>
            <br />
            <small className='example-color'>ex) 202302113070001</small>
          </div>
        </li>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>답안 입력</h6>
            <small className='text-body-secondary'>문제에 맞는 본인의 답안을 작성해주세요</small>
            {/* <br /> */}
            {/* <small className='example-color'>ex) 초승달은 무슨 모양일까요?</small> */}
          </div>
        </li>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>제출하기</h6>
            <small className='text-body-secondary'>시험 응시가 완료되었으면 제출하기 버튼을 눌러주세요. 한번 누르면 수정이 불가하니 꼼꼼히 확인해주세요!</small>
            {/* <br />
            <small className='example-color'>ex) 초승달의 초승은 초생이라는 한자어에서 비롯된 말이며, 손톱모양이다</small> */}
          </div>
        </li>
        {/* <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>키워드</h6>
            <small className='text-body-secondary'>답안에 필수로 들어가야 할 키워드를 입력해주세요. 키워드까지 입력하셨다면 확인 버튼을 눌러 문제를 저장해주세요</small>
          </div>
        </li>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>시험 일자 설정</h6>
            <small className='text-body-secondary'>시험을 진행할 일자와 시간을 설정해주세요. 일자 설정까지 완료하셨다면 시험 생성하기 버튼을 눌러주세요</small>
          </div>
        </li> */}
      </ul>
    </div>
  );
}

export default DoExam;