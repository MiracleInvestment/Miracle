import { useState } from 'react';
import styled from 'styled-components';

const TabMenu = styled.ul`
  // background-color: #dcdcdc;
  backgroun-color: #000000;
  color: rgb(232, 234, 237);
  // color: rgb(255, 255, 255);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  // margin-bottom: 7rem;
  margin: 50px 0px 50px 150px;
  // margin-left: 150px;
  border-radius: 10px 10px 0px 0px;

  .submenu {
  // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    width: calc(100% /4);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
    text-align: center;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255,255,255);
    color: rgb(21,20,20);
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  width: 75%;
  margin-left: 150px;
  text-align: center;
`;

const Tab = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '1번', content: 'ONE', answer: 'answer is one' },
    { name: '2번', content: 'two', answer: 'answer is two'  },
    { name: '3번', content: 'three', answer: 'answer is three'  },
    { name: '4번', content: 'four', answer: 'answer is four'  }
  ];

  const selectMenuHandler = (index) => {

    clickTab(index);
  };

  return (
    <>
        <TabMenu>
          문제
          {menuArr.map((el,index) => (
              <li className={index === currentTab ? "submenu focused" : "submenu" }
              onClick={() => selectMenuHandler(index)}>{el.name}</li>
            ))}
        </TabMenu>
        <Desc>
          <p>문제: {menuArr[currentTab].content}</p>
          <p>모범답안: {menuArr[currentTab].answer}</p>
        </Desc>
        <div>
          <h3>학생들 성적 확인</h3>
        </div>
        <button>엑셀 파일 다운로드</button>
    </>
  );
};

export default Tab;