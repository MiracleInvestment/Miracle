import { UseScrollAnimation } from './UseScrollAnimation';
import { Container } from './Styled';

type PropsType = {
  children: React.ReactNode;
};

export function ScrollLeftAnimationContainer({ children }: PropsType) {
  const { ref, isInViewport } = UseScrollAnimation();
  return (
    <Container ref={ref} className={isInViewport ? 'frame-in-left' : ''}>
      {children}
    </Container>
  );
}

export function ScrollRightAnimationContainer({ children }: PropsType) {
  const { ref, isInViewport } = UseScrollAnimation();
  return (
    <Container ref={ref} className={isInViewport ? 'frame-in-right' : ''}>
      {children}
    </Container>
  );
}
