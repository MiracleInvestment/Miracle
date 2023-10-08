import { useState } from "react";
import './Main.css'

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
    <div>
      <div className="basic">
        <div id="normal" className={isLeftHovering ? "expand" : ""} onMouseOver={handleLeftOver} onMouseOut={handleLeftOut}>시험 생성하기</div>
        <div id="normal" className={isRightHovering ? "expand" : ""} 
        onMouseOver={handleRightOver} onMouseOut={handleRightOut} onClick={pastExam}
        >이전 시험 불러오기</div>
      </div>
    </div>
  );
}