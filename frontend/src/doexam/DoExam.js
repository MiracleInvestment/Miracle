import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../dist/css/bootstrap.min.css';
import Footer from '../header/Footer';
import Header from '../header/Header3';
import moment from 'moment';
import { ListGroup, Card, Form, Button } from 'react-bootstrap';

function GetData({id}) {
  const [data, setData] = useState([]);
  const uri = `http://${process.env.SERVER_ADDRESS}:8000/exam/${id}/getExam`;

  useEffect(() => {
    axios.get(uri)
    .then((response) => {
      if(response.status !== 200) {
        throw new Error('Network response was not ok');
      } else {
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
  const uri = `http://${process.env.SERVER_ADDRESS}:8000/exam/${id}/getQuestions`;

  useEffect(() => {
    axios.get(uri)
    .then((response) => {
      if(response.status !== 200) {
        throw new Error('Network response was not ok');
      } else {
        setData(response.data);
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }, []);
  
  return data;
}

const DoExam = ({id}) => {
  const params = useParams();
  const exam = GetData({id: params.id});
  const questions = GetQuestionData({id: params.id});

  const date2 = moment(exam.ExamStartDate).format('YYYY-MM-DD');

  const [answers, setAnswers] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");

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
      StudentID: studentID,
      ExamID: exam.ExamID,
      QuestionID: question.QuestionID,
      StudentAnswer: answers[index]?.answer || '',
    })); 

    updatedDto.map((data, index) => {
      axios.post(`http://${process.env.SERVER_ADDRESS}:8000/exam/${params.id}/submitStudentAnswer`, data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error message from server:", error.response.data);
      })
    });

    window.location.href='/loading';
  }

  const submitInfo = () => {
    setIsEditing(false);
  }

  return(
    <>
    <Header />
    <div className="containerScoring">
      <div className="py-5 text-center">
        <h1>{exam.ExamName}</h1>
        <div className='mt-4'><span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{date2}에 생성됨</span></div>
        <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill">현재 39명 응시</span>
      </div>
      <Card>
        <Card.Header>
          <div className='hover'>
            <h5 className="col-2 p-1">인적사항 입력</h5>
            {isEditing ? (
              <div className="col-8 hover">
                <div className="col-md-3">
                  <input className='form-control' placeholder='학번' value={studentID} onChange={(e) => setStudentID(e.target.value)}/>
                </div>
                <div className="col-md-4 mx-2">
                  <input className='form-control' placeholder='이름' value={studentName} onChange={(e) => setStudentName(e.target.value)}/>
                </div>
                <button className="btn btn-dark rounded-custonm-pill px-3" type="button" onClick={setDTO}>확인</button>
              </div>
            ) : (
              <div className="col-8">
                <p>{studentID}({studentName})님이 시험 응시중입니다.</p>
              </div>
            )}
          </div>
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