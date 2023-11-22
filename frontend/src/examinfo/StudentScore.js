import { Link } from 'react-router-dom';
import '../css/DetailExam.css';
import '../dist/css/bootstrap.min.css';
import Footer from '../header/Footer';
import ScoreBar from './ScoreBar';
import '../css/Score.css';
// import JumboTron from '../header/JumboTron';

const StudentScore = ({id}) =>  {

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
        {/* 시험 이름, 날짜, 응시인원도 db 에서 불러오는 거로 변경해야 함 */}
        <h1 className="text-body-emphasis">2023-1학기 컴퓨터네트워킹 중간고사</h1>
        <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill">2023-04-23</span>
        <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill">39명 응시</span>
        {/* <p class="fs-5 col-md-8">2023-04-23</p>
        <p class="fs-5 col-md-8">시험 응시 인원: 39명</p> */}
        <div className="b-example-divider"></div>
        <p className="fs-5 col-md-15">2023년 4월 23일에 시행된 2023학년도 1학기 컴퓨터네트워킹 중간고사 학생별 성적 정보입니다.</p>
        <hr className="col-5 mb-4" />
        <div>
          <div className='scoreChecking mb-4'>
            <h4 className="text-body-emphasis me-4">학생별 성적 확인</h4>
            <a href="../examples/" className="btn btn-primary btn-md px-4">다운로드</a>
          </div>
          {/* <JumboTron /> */}
          {[...Array(parseInt(10))].map((n, index) => {
            return(<ScoreBar id={index+1}/>)
          })}
        </div>
      </div>  
      <Footer />
    </div>
    </>
  );

}

export default StudentScore;