import { useState } from "react";
import './css/Main.css'

export default function Main(){

  const [isLeftHovering, setIsLeftHovering] = useState(false);
  const [isRightHovering, setIsRightHovering] = useState(false);

  const handleLeftOver = () => {
    setIsLeftHovering(true);
  };

  const handleLeftOut = () => {
    setIsLeftHovering(false);
  };

  const handleRightOver = () => {
    setIsRightHovering(true);
  };

  const handleRightOut = () => {
    setIsRightHovering(false);
  };

  const pastExam = () => {
    window.location.href = '/callPastExam'
  };

  return (
    <>
    <div className="mainDesign">
      <div className="top1">Miracle</div>
      <div className="top2">AI 기반의 서술형 문제 자동 채점 시스템</div>
      <div className="top3">the AI-based descriptive question scoring system</div>
    </div>
    <div className="basic">
      <div id="normal" className={isLeftHovering ? "expand" : ""} onMouseOver={handleLeftOver} onMouseOut={handleLeftOut}>시험 생성하기</div>
      <div id="normal2" className={isRightHovering ? "expand" : ""} 
      onMouseOver={handleRightOver} onMouseOut={handleRightOut} onClick={pastExam}
      >이전 시험 불러오기</div>
  </div>
  </>
  );
}