// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import {ko} from 'date-fns/esm/locale';
import '../dist/css/bootstrap.min.css';
import '../css/Scoring.css';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../header/Header';


const GetData = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/exam/getLastPK')
    .then((response) => {
      if(response.status !== 200) {
        throw new Error('Network response was not ok');
      } else {
        // console.log(response.data);
        setData(response.data);
      }
      // console.log(data[0].ExamStartDate);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }, []);

  return data;
}

function CreateExam() {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [count, setCount] = useState({count : 1, question1: ""});
  const [startDate, setStartDate] = useState(new Date()); // 시작 날짜
  const [endDate, setEndDate] = useState(new Date()); // 종료 날짜
  const [questionText, setQuestionText] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");
  // const [keywords, setKeywords] = useState("");
  const keywords = "";

  const lastPK = GetData();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,  // 필요에 따라 설정
  });


  // console.log(response);
  
  // const [keyword, setKeyword] = useState(''); // 필수 키워드
  // const [keywordList, setKeywordList] = useState({});

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  // const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     setIsEditing(false); // 엔터 키를 누르면 입력 모드를 종료
  //   }
  // };

  // const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={ onClick } ref={ ref } >
  //     {value}
  //   </button>
  // ));
  // const addKeyword = {
  //   setKeywordList([...keywordList, keyword]);
  // }

  // console.log(startDate.toLocaleDateString());

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

  const handleQuestion = async () => {
    try {
      const questionsData = {
        'ExamID' : lastPK+1,
        'QuestionText': questionText,
        'ModelAnswer' : modelAnswer,
        'Keywords' : keywords,
      }

      const questionsResponse = await axiosInstance.post('http://localhost:8000/exam/createQuestion', questionsData);
      console.log('Questions created:', {questions: questionsResponse.data});
      
    } catch(error) {
      console.error('Error Creating exam:', error.message);
    }
  }
  
  const handleSubmit = async () => {
    try {
      const examResponse = await axios.post('http://localhost:8000/exam/create', {
        ExamName: name,
        ExamStartDate: startDate,
        ExamEndDate: endDate,
        // questions: questions
      });

      console.log(examResponse.data);
      
    } catch(error) {
      console.error('Error Creating exam:', error.message);
    }
  }

  const handleNameButton = () => {
    setIsEditing(!isEditing);
  }

  return (
    <>
    <Header />
    <div className="containerScoring">
      {/* 페이지 상단 */}
      <div className="py-5 text-center">
        <h2>시험 생성하기</h2>
        <p className="lead mt-4">시험 생성하기 페이지입니다. 시험에 관한 상세정보를 입력해주시면 됩니다.</p>
      </div>
      {/* 페이지 중간부 */}
      <div className="row g-5">
        <Intro />
        <div className="col-md-7 col-lg-8">
          <h2 className="mb-3">시험 상세정보</h2>
          {/* <p>{lastPK}</p> */}
          <hr />
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-12">
                <h5 className="mb-3 mt-3">시험 이름</h5>
                {isEditing ? (
                  <div>
                    <input type="text" id="name" value={name} onChange={handleNameChange} onKeyPress={handleEnterPress} 
                    placeholder="시험 이름을 입력하세요" className="form-control"/>
                    <div className="b-example-divider1"></div>
                    <button className="btn btn-dark rounded-custonm-pill px-3 mb-3" type="button" onClick={handleNameButton}>확인</button>
                  </div>
                  ) : (
                  <div>
                    {/* 수정해야 함 */}
                    <p >{name}<button onClick={handleNameButton}>수정</button></p>
                  </div>
                )}
              </div>
              {/* 문제 추가 부분 */}
              <div className="col-12">
                <div className="hover mb-4">
                  <h5 className="col-md-3 mb-4">시험 문제 업로드</h5>
                  <button className="btn btn-success rounded-custom-pill px-3" type="button" onClick={addQuestion}>추가</button>
                  <button className="btn btn-danger rounded-custom-pill px-3" type="button" onClick={delQuestion}>삭제</button>
                </div>
                <div>
                  {count.count > 0 && [...Array(count.count)].map((item, i) => {
                    return (
                      <div className="container mb-3">
                        <div className="list-group">
                          <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <h6 className="mb-2">문제 {i+1}</h6>
                              <input className="col-md-10" onChange={(e) => setQuestionText(e.target.value)}/>
                            </div>
                          </div>
                          <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <h6 className="mb-2">모범답안</h6>
                                  {/* <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>  */}
                                <textarea className="col-md-10" onChange={(e) => setModelAnswer(e.target.value)}/>
                              </div>
                            </div>
                          </div>
                          <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <h6 className="mb-2">핵심 키워드</h6>
                                {/* <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)}
                                onkeyDown={e=>(e.key==='Enter' ? addKeyword() : null)} 
                                />
                                <button>추가</button> */}
                              </div>
                            </div>
                          </div>
                          <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <button className="btn btn-dark rounded-custonm-pill px-3 mb-3" type="button" onClick={handleQuestion}>확인</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* 시험 일자 설정 */}
              <div className="col-12">
                  <h5>시험 일자 설정</h5>
                  <div className='date'>
                    <div className="col-md-6">
                      <p className='lead'>시작일자</p>
                      <DatePicker locale={ko} selected={startDate} onChange={(date) => setStartDate(date)} 
                      minDate={new Date()} dateFormat="yyyy년 MM월 dd일" />
                    </div>
                    <div className="col-md-6">
                      <p className='lead'>종료일자</p>
                      <DatePicker locale={ko} selected={endDate} onChange={(date) => setEndDate(date)} 
                      minDate={startDate} dateFormat="yyyy년 MM월 dd일" />
                    </div>
                  </div>
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

const Intro = () => {
  // const questionInfo = "시험에 출제할 문제를 입력해주세요.Ex)";
  return (
    <div className="col-md-5 col-lg-4 order-md-last">
      <h4 className="d-flex justify-content-between align-items-cneter mb-3">
          <span className='text-primary'>상세 설명</span>
      </h4>
      <ul className='list-group mb-3'>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>시험 이름</h6>
            <small className='text-body-secondary'>시험의 이름을 입력해주세요</small>
            <br />
            <small className='example-color'>ex) 2023학년도 2학기 지구과학 기말고사</small>
          </div>
        </li>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>시험 문제</h6>
            <small className='text-body-secondary'>시험에 출제할 문제를 입력해주세요</small>
            <br />
            <small className='example-color'>ex) 초승달은 무슨 모양일까요?</small>
          </div>
        </li>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>모범답안</h6>
            <small className='text-body-secondary'>문제에 맞는 모범답안을 입력해주세요.</small>
            <br />
            <small className='example-color'>ex) 초승달의 초승은 초생이라는 한자어에서 비롯된 말이며, 손톱모양이다</small>
          </div>
        </li>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>키워드</h6>
            <small className='text-body-secondary'>답안에 필수로 들어가야 할 키워드를 입력해주세요. 키워드까지 입력하셨다면 확인 버튼을 눌러 문제를 저장해주세요</small>
          </div>
        </li>
        <li className='list-group-item d-flex justify-content-between lh-sm'>
          <div>
            <h6 className='my-0'>시험 일자 설정</h6>
            <small className='text-body-secondary'>시험을 진행할 일자와 시간을 설정해주세요. 일자 설정까지 완료하셨다면 시험 생성하기 버튼을 눌러주세요</small>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CreateExam;
