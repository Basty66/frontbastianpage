import { useEffect, useRef } from 'react';

export default function useScrollLock(isLocked) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isLocked) return;

    scrollYRef.current = window.scrollY;

    const { body, documentElement: html } = document;
    const scrollbarW = window.innerWidth - html.clientWidth;

    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      body.style.overflow = '';
      html.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.paddingRight = '';
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isLocked]);
}
