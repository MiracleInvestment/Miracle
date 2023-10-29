// import TopBar from "../header/TopBar";
import { Link } from 'react-router-dom';
// import Tab from "./Tab";
// import '../css/DetailExam.css'
import '../dist/css/bootstrap.min.css';
import Footer from '../header/Footer';
import JumboTron from '../header/JumboTron';
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from 'react';
// import axios from 'axios';

const DetailExam = ({id}) =>  {
  // const { examId } = useParams();
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   axios.get(`http://localhost:8000/api/${id}`).then((response) => {
  //     setData(response.data);
  //   })
  // }, []);

  return (
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
      <div className="py-5 text-center">
        <h2>시험 상세 정보</h2>
        {/* <p className="lead">이전에 생성되었던 시험 목록입니다</p> */}
      </div>
      <div className='col-lg-8 mx-auto p-4 py-md-5'>
        <h1 class="text-body-emphasis">시험 이름</h1>
        <p class="fs-5 col-md-8">2023-10-29</p>
        <p class="fs-5 col-md-8">시험 응시 인원: 명</p>
        {/* <div class="mb-5">
          <a href="../examples/" class="btn btn-primary btn-lg px-4">Download examples</a>
        </div> */}
        <hr class="col-3 col-md-2 mb-5" />
        <div className='row g-5'>
          <div className='col-md-6'>
            <h2 className="text-body-emphasis">시험 문제</h2>
            <p>시험에 출제된 문제를 확인할 수 있습니다.</p>
            <JumboTron />
            <JumboTron />
            <JumboTron />
          </div>
          <div className='col-md-6'>
            <h2 className="text-body-emphasis">학생들 성적 확인</h2>
            <p>학생들 성적 정보를 다운로드 하실 수 있습니다.</p>
            <div class="mb-5">
              <a href="../examples/" class="btn btn-primary btn-lg px-4">다운로드</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      
    </div>
    {/* <div>
      {data}
      <h2>시험 정보</h2>
      <table className={"detailExamTable"}>
        <tr>
          <th>No</th>
          <td></td>
        </tr>
        <tr>
          <th>Title</th>
          <td>시험 제목</td>
        </tr>
        <tr>
          <th>생성일자</th>
          <td>2023-00-00</td>
        </tr>
      </table>
      <hr/>
      <Tab />
      <hr />
      <div className={'score'}>
        <h3>학생들 성적 확인</h3>
        <button>엑셀 파일 다운로드</button>
      </div>
    </div>  */}
    </>
  );
}

export default DetailExam;