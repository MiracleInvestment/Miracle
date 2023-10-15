import { Link } from 'react-router-dom';
import { Container } from './Styled';
import { useRef } from 'react';
import FileUpload from './FileUpload'
import { CustomInput } from './Styled'
// import Home from './Home';
// import Image from './assets/sunset.jpg';

import React, { useState } from 'react';
import TopBar from './TopBar';

function Scoring() {
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

  }

  const handleNameButton = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div>
      <TopBar />
      {isEditing ? (
        <div>
          <CustomInput
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            onKeyPress={handleEnterPress}
            placeholder="시험 이름을 입력하세요"
          />
          <button onClick={handleNameButton}>확인</button>
        </div>
      ) : (
        <div>
          <p >{name}<button onClick={handleNameButton}>수정</button></p>
          
        </div>
      )}
      <div style={{display: 'flex'}}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <p>시험</p>
         </div>
        <div style={{ flex: 2, marginRight: '10px' }}>
          <FileUpload name="test" />
        </div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <p>모범답안</p>
         </div>
        <div style={{ flex:2, marginRight: '10px' }}>
          <FileUpload name="correctAnswer" />
        </div>
      </div>      
      <div style={{display: 'flex'}}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <p>학생답안</p>
         </div>
        <div style={{ flex:2, marginRight: '10px' }}>
          <FileUpload name="studentAnswer" />
        </div>
      </div>
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
}

export default Scoring;
