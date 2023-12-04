import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/DetailExam.css';
import '../dist/css/bootstrap.min.css';
import Footer from '../header/Footer';
import JumboTron from '../header/JumboTron';
import Header from '../header/Header2';
import moment from 'moment';

const GetQuestion = ({id}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://${process.env.SERVER_ADDRESS}:8000/exam/${id}/getQuestions`)
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

const GetExam = ({id}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://${process.env.SERVER_ADDRESS}:8000/exam/${id}/getExam`)
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

const DetailExam = ({id}) =>  {

  const params = useParams();
  const scoreUri = `/detailExam/${params.id}/studentScores`;
  // console.log(params.id);
  const Id = params.id;

  const exam = GetExam({id : Id});
  const date = moment(exam.ExamStartDate).format('YYYY년 MM월 DD일');
  const date2 = moment(exam.ExamStartDate).format('YYYY-MM-DD');

  const questions = GetQuestion({id : Id});
  // console.log(questions);

  return (
    <>
    <Header />
    <div className='container'>
      <div className="py-5 text-center">
        <h2>시험 상세 정보</h2>
      </div>
      <div className='col-lg-8 mx-auto p-4 py-md-5'>
        {/* 시험 이름, 날짜, 응시인원도 db 에서 불러오는 거로 변경해야 함 */}
        <h1 className="text-body-emphasis">{exam.ExamName}</h1>
        <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">{date2}</span>
        <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill">39명 응시</span>
        <div className="b-example-divider"></div>
        <p className="fs-5 col-md-15">{date}에 시행된 "{exam.ExamName}"에 관한 정보입니다.</p>
        <hr className="col-3 col-md-2 mb-5" />
        <div className='row g-5'>
          <div className='col-md-6'>
            <h2 className="text-body-emphasis">시험 문제</h2>
            <p>시험에 출제된 문제를 확인할 수 있습니다.</p>
            {/* 문제 db 에서 불러와서 map으로 변경 */}
            {(Object.values(questions)).map((question, index) => (
              // <Album no={item.ExamID} title={item.ExamName} date={item.ExamStartDate} />
              <JumboTron no={index+1} content={question.QuestionText} answer={question.ModelAnswer}/>
            ))}
          </div>
          <div className='col-md-6'>
            <h2 className="text-body-emphasis">학생들 성적 확인</h2>
            <p>학생들 성적 정보 확인 및 다운로드 할 수 있습니다.</p>
            <div className="mb-5">
              <a href={scoreUri} className="btn btn-primary btn-lg px-4 me-4">성적확인</a>
              {/* <div className=""></div> */}
              <a href="../examples/" className="btn btn-primary btn-lg px-4">다운로드</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
    </>
  );
}

export default DetailExam;