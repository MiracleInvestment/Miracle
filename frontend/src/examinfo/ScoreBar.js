import '../dist/css/bootstrap.min.css';

const ScoreBar = ({id}) => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary rounded mb-3" aria-label="Eleventh navbar example">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        {/* <p className='lead'>학생1</p> */}
        <h4 className='nav-link me-4'>학생 {id}</h4>
        <h5 className='nav-link me-3'>전체 점수</h5>
        <h5 className='nav-link me-5'>84</h5>
        <h5 className='nav-link me-3'>문항별 점수</h5>
        {/* <p className='nav-link'>학생1</p> */}
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarsExample09">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
              <h6 className="nav-link disabled">39</h6>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Link</a> */}
              <h6 className="nav-link disabled">56</h6>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> */}
          </ul>
          {/* <form role="search">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
          </form> */}
        </div>
      </div>
    </nav>
    </>
  );
}

export default ScoreBar;