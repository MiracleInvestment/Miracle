import { Link } from 'react-router-dom';
import '../dist/css/bootstrap.min.css';

const JumboTron = ({no, title, date}) => {
  const uri = `/detailExam/${no}`
  return (
    <div className="container my-5">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        {/* <svg className="bi mt-4 mb-3" style="color: var(--bs-indigo);" width="100" height="100"><use xlink:href="#bootstrap"/></svg> */}
        {/* <h1 className="text-body-emphasis">Jumbotron with icon</h1> */}
        {/* <p className="col-lg-8 mx-auto fs-5 text-muted">
          This is a custom jumbotron featuring an SVG image at the top, some longer text that wraps early thanks to a responsive <code>.col-*</code> className, and a customized call to action.
        </p> */}
        <p>문제 번호</p>
        <p>문제 내용</p>
        <p>모범 답안</p>
      </div>
    </div>
  );
}

export default JumboTron;