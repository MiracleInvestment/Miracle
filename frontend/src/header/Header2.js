import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
    <header className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
          {/* <li className="nav-item"><a href="#" className="nav-link">Home</a></li> */}
        <li className="nav-item"><Link to='/main' className='nav-link'>Home</Link></li> 
        <li className="nav-item"><Link to='/createExam' className="nav-link" aria-current="page">시험 생성하기</Link></li>
        <li className="nav-item"><Link to='/callPastExam' className="nav-link active" >시험 불러오기</Link></li>
        <li className="nav-item"><Link to='/doExam' className="nav-link" aria-current="page">시험 응시하기</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link">FAQ</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link">About</Link></li>
      </ul>
    </header>
    </>
  );
}

export default Header;