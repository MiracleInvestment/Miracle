import React, { useState, useEffect } from 'react';
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
        // console.log(response.data);
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
        // console.log(response.data);
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

  const [answers, setAnswers] = useState([]);
  const [dtoAnswer, SetDtoAnswer] = useState([]);

  const handleAnswerChange = (index, event) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex((answer) => answer.index === index);
      if (existingAnswerIndex !== -1) {
        updatedAnswers[existingAnswerIndex].answer = value;
      } else {
        updatedAnswers.push({
          index, 
          answer: value
        });
      }
      return updatedAnswers;
    })
  }

  const setDTO = () => {
    const updatedDto = questions.map((question, index) => ({
      StudentID: "1",
      ExamName: exam.ExamName,
      QuestionID: question.QuestionID,
      StudentAnswer: answers[index]?.answer || '',
    }));
    SetDtoAnswer(updatedDto);
    console.log(dtoAnswer);

    const studentDTO = dtoAnswer.reduce((acc, item) => {
      acc[item.StudentID] = item;
      return acc;
    }, {});

    setTimeout(() => {
      // POST 학생들 답안 넘기기
      axios.post(`http://localhost:8000/exam/${params.id}/submitStudentAnswer`, studentDTO)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error message from server:", error.response.data);
      })
    }, 2000);
  }

  // console.log(dtoAnswer);

  return(
    <>
    <Header />
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
          {questions.map((question, index) => (
            <ListGroup.Item key={index}>
              <Card.Text className="mt-1">문제 {index + 1}</Card.Text>
              <Card.Text style={{ fontSize: '1.5rem' }} >{question.QuestionText}</Card.Text>
              <Form.Control as="textarea" placeholder="여기에 답을 입력하세요" rows="4" className="mb-2"
                value={(answers.find((answer) => answer.index === index)?.answer) || ''} 
                onChange={(event) => handleAnswerChange(index, event)}/>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Footer className="text-center">
          <Button variant="primary" className="w-100" onClick={setDTO}>제출하기</Button>
        </Card.Footer>
      </Card>
      <Footer />
    </div>
    </>
  );
}

export default DoExam;