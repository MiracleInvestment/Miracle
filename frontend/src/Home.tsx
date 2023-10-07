import { Link } from 'react-router-dom';
import {
  ScrollLeftAnimationContainer,
  ScrollRightAnimationContainer,
} from './ScrollAnimationContainer';
import { Container } from './Styled';
// import Home from './Home';
// import Image from './assets/sunset.jpg';

export default function Home() {
  return (
    <>
      <Container>
        <h1> 안녕하세요, 미라클 입니다 </h1>
      </Container>
      <ScrollLeftAnimationContainer>
        <h1> 서술형 채점 이제는 자동으로 </h1>
      </ScrollLeftAnimationContainer>
      <ScrollRightAnimationContainer>
        <h1> 온라인 서술형 자동 채점 시스템, Miracle </h1>
        <Link to="/login">시작하기</Link>
      </ScrollRightAnimationContainer>
    </>
  );
}
