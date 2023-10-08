import TopBar from "./TopBar";
import Tab from "./Tab";
import './DetailExam.css'

const DetailExam = () =>  {
  return (
    <div>
      <TopBar />
      <h2>시험 정보</h2>
      <table>
        <tr>
          <th>No</th>
          <td>1</td>
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
      <Tab />
    </div>
  );
}

export default DetailExam;