import { Link } from 'react-router-dom';
// import FileUpload from './FileUpload'
import React, { useState } from 'react';
import '../dist/css/bootstrap.min.css';
import '../css/Scoring.css';
// import Question from './Question';

function CreateExam() {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [count, setCount] = useState({count : 1, question1: ""});

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  // const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     setIsEditing(false); // 엔터 키를 누르면 입력 모드를 종료
  //   }
  // };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false); // Pressing Enter key to exit edit mode
    }
  };

  const addQuestion = () => {
    const number = count.count+1;
    setCount({...count, count:number, [`question${number}`]: ""});
  };

  const delQuestion = (i) => {
    const newCount = {...count};

    for (let n = 1; n < newCount.count; n++) {
      if (n === i) {
        delete newCount[`question${n}`];
      } else {
        Object.defineProperty(
          newCount,
          "question" + (n-1),
          Object.getOwnPropertyDescriptor(newCount, "question" + n)
        );
        delete newCount[`question${n}`];
      }
    }

    setCount({...newCount, count: count.count-1});
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
                <h6 className='my-0'>시험 문제 & 모범답안 & 키워드</h6>
                <small className='text-body-secondary'>시험에 출제한 문제와 모범답안, 핵심 키워드를 입력해주세요. 추가 버튼을 누르시면 문제를 추가할 수 있습니다</small>
              </div>
            </li>
            <li className='list-group-item d-flex justify-content-between lh-sm'>
              <div>
                <h6 className='my-0'>시험 일자 설정</h6>
                <small className='text-body-secondary'>시험을 진행할 일자와 시간을 설정해주세요</small>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h2 className="mb-3">시험 상세정보</h2>
          <hr />
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-12">
                {/* <label htmlFor="name" className="form-label">시험 이름</label> */}
                <h5 className="mb-3 mt-3">시험 이름</h5>
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
                    <div className="b-example-divider1"></div>
                    <button className="btn btn-dark rounded-custonm-pill px-3 mb-3" type="button" onClick={handleNameButton}>확인</button>
                    {/* <button onClick={handleNameButton}>확인</button> */}
                  </div>
                  ) : (
                  <div>
                    <p >{name}<button onClick={handleNameButton}>수정</button></p>
                  </div>
                )}
              </div>
              {/* 이 부분을 직접 추가할 수 있게 바꾸기
                1. 문제 & 모범답안 세트로 한개 먼저 던져주기
                2. 추가 버튼 누르면 문제와 모범답안 추가할 수 있게 하기
                3. 키워드도 추가
              */}
              {/* <hr className="my-4"/> */}
              <div className="col-12">
                
                <div className="hover mb-4">
                  <h5 className="col-md-3 mb-4">시험 문제 업로드</h5>
                  <button className="btn btn-success rounded-custom-pill px-3" type="button" onClick={addQuestion}>추가</button>
                  <button className="btn btn-danger rounded-custom-pill px-3" type="button" onClick={delQuestion}>삭제</button>
                </div>
                {/* 문제 추가 부분 */}
                <div>
                  {count.count > 0 && [...Array(count.count)].map((item, i) => {
                    return (
                      <>
                      {/* <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-2 align-items-center justify-content-center"> */}
                      <div className="container mb-3">
                        <div className="list-group">
                          <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <h6 className="mb-2">문제 {i+1}</h6>
                              <input className="col-md-10"/>
                            </div>
                          </div>
                          <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <h6 className="mb-2">모범답안</h6>
                                  {/* <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>  */}
                                <textarea className="col-md-10"/>
                              </div>
                            </div>
                          </div>
                          <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <h6 className="mb-2">핵심 키워드</h6>
                                    {/* <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>  */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      </>
                    );
                  })}
                </div>
              </div>
              {/* <hr className="my-4"/> */}
              <div className="col-12">
                  <h5>시험 일자 설정</h5>
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
