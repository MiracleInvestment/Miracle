// import { useState } from "react";
// import './css/Main.css'
import './dist/css/bootstrap.min.css';
import Footer from './header/Footer';

export default function Main(){

  // const [isLeftHovering, setIsLeftHovering] = useState(false);
  // const [isRightHovering, setIsRightHovering] = useState(false);

  // const handleLeftOver = () => {
  //   setIsLeftHovering(true);
  // };

  // const handleLeftOut = () => {
  //   setIsLeftHovering(false);
  // };

  // const handleRightOver = () => {
  //   setIsRightHovering(true);
  // };

  // const handleRightOut = () => {
  //   setIsRightHovering(false);
  // };

  const pastExam = () => {
    window.location.href = '/callPastExam'
  };

  const createExam = () => {
    window.location.href = '/createExam'
  };

  return (
    <>
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <a href="/main" className="d-flex align-items-cneter text-body-emphasis text-decoration-none">
          <span className="fs-4">Miracle</span>
        </a>
      </header>
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Miracle</h1>
          <p className="col-md-8 fs-4">Miracle은 Miracle Investment에서 제작한 AI 기반의 서술형 문제 자동 채점 시스템입니다. Miracle을 통해 채점 시간을 획기적으로 줄여보세요!</p>
          <p className="col-md-8 fs-4">언제든지 지난 시험을 불러올 수도 있습니다.</p>
          {/* <button className="btn btn-primary btn-lg" type="button"></button> */}
        </div>
      </div>
      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h2>시험 생성하기</h2>
            <p>시험을 생성하여 미라클을 시작해보세요! 채점은 미라클이 해줄거니까요!</p>
            <button className="btn btn-outline-light" type="button" onClick={createExam}>생성하기</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>시험 불러오기</h2>
            <p>이전에 생성했던 시험 목록을 확인할 수 있습니다. 다양한 기능도 확인해보세요!</p>
            <button className="btn btn-outline-secondary" type="button" onClick={pastExam}>불러오기</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
}