import { useRef, useState, useEffect } from 'react';

export const UseScrollAnimation = () => {
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      // 2. callback의 Entry에서 사용자의 viewport에 ref를 적용한 Container가 진입했는지 여부 판단
      entries.forEach((entry) => {
        // 3. isInViewport set
        if (entry.isIntersecting) {
          // 4. Container의 ClassName에 frame-in-left or frame-in-right 삽입
          setIsInViewport(true);
        } else {
          setIsInViewport(false);
        }
      });
    };

    const options = { root: null, rootMargin: '0px', threshold: 0 };

    // 1. Observer가 스크로 감지하고 callback 호출
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 관찰 중단
    };
  }, []);

  return { ref, isInViewport };
};
