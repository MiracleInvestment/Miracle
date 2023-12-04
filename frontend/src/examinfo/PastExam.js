import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import '../dist/css/bootstrap.min.css';
import Album from '../header/Album';
import Footer from '../header/Footer';
import Header from '../header/Header2';

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

const PastExam = props => {
  // const {headernames, children} = props;
  const items = GetData();
  console.log(items);

  return(
    <>
    <Header />
    <div className='container'>
      {/* <TopBar /> */}
      <div className="py-5 text-center">
        <h2>시험 목록</h2>
        <p className="lead mt-4">이전에 생성되었던 시험 목록입니다</p>
      </div>
      {/* <Table headerName={['No.', '시험 제목', '게시 일자']}>
        {item}
      </Table> */}
      <div className="album py-5 bg-body-tertiary">
        <div className='container'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
            {(Object.values(items)).map((item) => (
              <Album no={item.ExamID} title={item.ExamName} date={item.ExamStartDate} />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default PastExam;