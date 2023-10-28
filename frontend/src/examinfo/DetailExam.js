import TopBar from "../header/TopBar";
import Tab from "./Tab";
import '../css/DetailExam.css'
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
    <div>
      <TopBar />
      {/* {data} */}
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
    </div>
  );
}

export default DetailExam;