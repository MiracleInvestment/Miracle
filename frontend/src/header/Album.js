import { Link } from 'react-router-dom';
import '../dist/css/bootstrap.min.css';
import '../css/Album.css';

const Album = ({no, title, date}) => {
  
  const uri = `/detailExam/${no}`;

  return (
    <div className="col">
      <div className="card shadow-sm">
        <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">{title}</text></svg>
        <div className="card-body">
          <p className="card-text">시험 상세설명</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary">응시인원: 39명</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">
                <Link to={uri} style={{textDecoration:"none", color:"black"}}>상세 정보 보기</Link>
              </button>
            </div>
            <small className="text-body-secondary">{date}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Album;