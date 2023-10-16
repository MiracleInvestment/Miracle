import { useState } from 'react';
import styled from 'styled-components';
import '../css/Tab.css';

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
  margin: 50px 0px 0px 200px;
  // margin-left: 150px;
  border-radius: 10px 10px 0px 0px;
  // border: 1px solid black;

  .submenu {
  // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between;
    // width: 300px;
    heigth: 30px; */
    width: calc(100% /5);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
    border: 1px solid black;
    border-bottom: none;
    text-align: center;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: aliceblue;
    color: rgb(21,20,20);
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  width: 80%;
  height: 150px;
  // line-height: 40px;
  margin-left: 150px;
  // margin-bottom: 50px;
  text-align: center;
  justify-content: center;
  background-color: aliceblue;
`;

const Tab = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    // { name: "문제" },
    { name: '1번', content: 'ONE', answer: 'answer is one' },
    { name: '2번', content: 'two', answer: 'answer is two'  },
    { name: '3번', content: 'three', answer: 'answer is three'  },
    { name: '4번', content: 'four', answer: 'answer is four'  }
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  return (
    <div>
        <div className={"question"}>시험 세부 정보</div>
        <TabMenu>
          {menuArr.map((el,index) => (
              <li className={index === currentTab ? "submenu focused" : "submenu" }
              onClick={() => selectMenuHandler(index)}>{el.name}</li>
            ))}
        </TabMenu>
        <Desc>
          <div className='desc'>
            <p>문제: {menuArr[currentTab].content}</p>
            <p>모범답안: {menuArr[currentTab].answer}</p>
          </div>
        </Desc>
    </div>
  );
};

export default Tab;