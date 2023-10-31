import { Link } from 'react-router-dom';
import FileUpload from './FileUpload'
import React, { useState } from 'react';
import '../dist/css/bootstrap.min.css';
import '../css/Scoring.css';

function CreateExam() {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false); // 엔터 키를 누르면 입력 모드를 종료
    }
  };

  const handleSubmit = () => {
    // 시험 생성하기 버튼을 누르면 동작
    // 1. 채점이 완료될 때까지 로딩? 화면
    // 2. 채점이 완료되면 완료되었다는 화면과 학생들 성적을 보여줘야 함
    // 3. ..
  }

  const handleNameButton = () => {
    setIsEditing(!isEditing);
  }

  return (
    <>
    <header className="d-flex justify-content-center py-3">
      <ul className="nav nav-pills">
          {/* <li className="nav-item"><a href="#" className="nav-link">Home</a></li> */}
        <li className="nav-item"><Link to='/main' className='nav-link'>Home</Link></li> 
        <li className="nav-item"><Link to='/createExam' className="nav-link active" aria-current="page">시험 생성하기</Link></li>
        <li className="nav-item"><Link to='/callPastExam' className="nav-link">시험 불러오기</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link">FAQ</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link">About</Link></li>
      </ul>
    </header>
    <div className="containerScoring">
      <div className="py-5 text-center">
        <h2>시험 생성하기</h2>
        <p className="lead">시험 생성하기 페이지입니다. 시험에 관한 상세정보를 입력해주시면 됩니다.</p>
      </div>
      {/* <div className="col-md-5 col-lg-4">

      </div> */}
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-cneter mb-3">
            <span className='text-primary'>상세 설명</span>
          </h4>
          <ul className='list-group mb-3'>
            <li className='list-group-item d-flex justify-content-between lh-sm'>
              <div>
                <h6 className='my-0'>시험 이름</h6>
                <small className='text-body-secondary'>시험의 이름을 입력해주세요</small>
              </div>
            </li>
            <li className='list-group-item d-flex justify-content-between lh-sm'>
              <div>
                <h6 className='my-0'>시험 문제 업로드</h6>
                <small className='text-body-secondary'>시험에 출제한 문제를 파일 형식에 맞게 업로드해주세요</small>
              </div>
            </li>
            <li className='list-group-item d-flex justify-content-between lh-sm'>
              <div>
                <h6 className='my-0'>모범 답안 업로드</h6>
                <small className='text-body-secondary'>문제별 모범 답안을 파일 형식에 맞게 업로드해주세요</small>
              </div>
            </li>
            <li className='list-group-item d-flex justify-content-between lh-sm'>
              <div>
                <h6 className='my-0'>학생 답안 업로드</h6>
                <small className='text-body-secondary'>학생들의 답안을 파일 형식에 맞게 업로드해주세요</small>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">시험 상세정보</h4>
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="name" className="form-label">시험 이름</label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                      onKeyPress={handleEnterPress}
                      placeholder="시험 이름을 입력하세요"
                      className="form-control"
                    />
                    {/* <div className='container'></div> */}
                    <button className="btn btn-dark rounded-pill px-3" type="button" onClick={handleNameButton}>확인</button>
                    {/* <button onClick={handleNameButton}>확인</button> */}
                  </div>
                  ) : (
                  <div>
                    <p >{name}<button onClick={handleNameButton}>수정</button></p>
                  </div>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="test" className="form-label">시험 문제 업로드</label>
                <FileUpload name="test" />
              </div>
              <div className="col-12">
                <label htmlFor="test" className="form-label">모범 답안 업로드</label>
                <FileUpload name="correctAnswer" />
              </div>
              <div className="col-12">
                <label htmlFor="test" className="form-label">학생 답안 업로드</label>
                <FileUpload name="studentAnswer" />
              </div>
            </div>
            <hr className="my-4"></hr>
            <button className="w-100 btn btn-primary btn-lg" type="submit" onClick={handleSubmit}>시험 생성하기</button>
          </form>
        </div>
      </div>
      {/* <script src="./dist/js/bootstrap.bundle.min.js"></script> */}
      <footer className="pt-3 mt-4 text-body-secondary border-top">
        <p>Copyright 2023. Miracle Investment Co., Ltd. all rights reserved.</p>
        <p>서울특별시 중구 필동로 1길 30, 신공학관</p>
        <p>Tel) 010 - 1234 - 5678</p>
      </footer>
    </div>
    </>
  );
}

export default CreateExam;
