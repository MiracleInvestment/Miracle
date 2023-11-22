// import { useParams } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/DetailExam.css';
import '../dist/css/bootstrap.min.css';
import Footer from '../header/Footer';
import JumboTron from '../header/JumboTron';

const DetailExam = ({id}) =>  {
  // const { examId } = useParams();
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   axios.get(`http://localhost:8000/api/${id}`).then((response) => {
  //     setData(response.data);
  //   })
  // }, []);

  const params = useParams();
  const scoreUri = `/detailExam/${params.id}/studentScores`;
  // console.log(scoreUri);

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
        <p className="fs-5 col-md-15">2023년 4월 23일에 시행된 2023학년도 1학기 컴퓨터네트워킹 중간고사에 관한 정보입니다.</p>
        {/* <div class="mb-5">
          <a href="../examples/" class="btn btn-primary btn-lg px-4">Download examples</a>
        </div> */}
        <hr className="col-3 col-md-2 mb-5" />
        <div className='row g-5'>
          <div className='col-md-6'>
            <h2 className="text-body-emphasis">시험 문제</h2>
            <p>시험에 출제된 문제를 확인할 수 있습니다.</p>
            {/* 문제 db 에서 불러와서 map으로 변경 */}
            <JumboTron no={1} content={'What is the end-to-end delay? Assume the propagation ~'}
            answer={'So, the end-to-end delay is h/R + h/R + (L-h)/R'}/>
            <JumboTron no={2} content={'d'}/>
            {/* <JumboTron /> */}
          </div>
          <div className='col-md-6'>
            <h2 className="text-body-emphasis">학생들 성적 확인</h2>
            <p>학생들 성적 정보 확인 및 다운로드 할 수 있습니다.</p>
            <div className="mb-5">
              {/* <button className="btn btn-primary btn-lg px-4">성적확인</button> */}
              <a href={scoreUri} className="btn btn-primary btn-lg px-4 me-4">성적확인</a>
              {/* <div className=""></div> */}
              <a href="../examples/" className="btn btn-primary btn-lg px-4">다운로드</a>
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