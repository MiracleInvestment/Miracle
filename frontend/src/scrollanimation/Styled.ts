import styled, { keyframes } from 'styled-components';

const frameInLeftAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    100% {
        opacity: 1;
        transform: translatex(0%);
    }
`;

const frameInRightAnimation = keyframes`
    0% {
      opacitiy: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url('./assets/sunset.jpg');
  background-size: cover;

  &.frame-in-left {
    animation: ${frameInLeftAnimation} 2s forwards;
  }

  &.frame-in-right {
    animation: ${frameInRightAnimation} 2s forwards;
  }
`;

// none: 애니메이션이 끝난 후 상태 설정 x
// forwards: 애니메이션이 끝난 다음 그 지점에 그대로
// backwards: 시작점으로 돌아감
// both: 앞뒤의 결과를 조합하여 설정
// inherit: 상태를 상위 요소에 상속받음
