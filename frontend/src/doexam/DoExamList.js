import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header3';
import Footer from '../header/Footer';
import Container from './DoExamContainer';
import moment from 'moment';

function GetData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://${process.env.SERVER_ADDRESS}:8000/exam/lists`)
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

const DoExamList = () => {
  const exams = GetData();

  return (
    <>
    <Header />
    <div className='containerScoring'>
      {/* <TopBar /> */}
      <div className="row g-5">
        <div className="py-5 text-center">
          <h2>시험 응시하기</h2>
          <p className="lead mt-4">시험을 응시하러온 여러분을 환영합니다.</p>
          <p className="lead">아래의 시험들 중 자신이 응시할 시험을 선택하여 진행해주시면 됩니다. 좋은 점수 얻기를 응원합니다!</p>
        </div>
        {(Object.values(exams)).map((exam) => (
          <Container no={exam.ExamID} title={exam.ExamName} date={moment(exam.ExamStartDate).format('YYYY-MM-DD')} />
        ))}
        <Footer/>
      </div>
    </div>
    </>
  );
}

export default DoExamList;
