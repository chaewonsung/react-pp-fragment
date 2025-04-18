import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import useSplitText from '../../hooks/useSplitText';

export const SplitChar = ({ children }) => {
  return (
    <>
      {children.split('').map((c, i) => (
        <span key={i} className="char">
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </>
  );
};

export const SplitLine = ({
  children,
  as: Component = 'p',
  anim = true,
  animTriggerRef,
}) => {
  const containerRef = useRef();
  const [text, cleanup] = useSplitText(containerRef);

  if (anim) {
    useGSAP(
      () => {
        if (!text.length) return;

        gsap.from('.line', {
          yPercent: 100,
          stagger: 0.06,
          onComplete: cleanup,
          scrollTrigger: {
            trigger: animTriggerRef?.current || containerRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      },
      { dependencies: [text], scope: containerRef }
    );
  }

  return (
    <Component
      ref={containerRef}
      style={
        text.length && anim
          ? { display: 'flex', flexDirection: 'column' }
          : undefined
      }
    >
      {text.length
        ? text.map(({ line }) => (
            <span key={line} className="line-wrapper">
              <span className="line">{line}</span>
            </span>
          ))
        : children}
    </Component>
  );
};
