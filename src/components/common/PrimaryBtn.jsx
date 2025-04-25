import classNames from 'classnames';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitChar } from './SplitText';

const PrimaryBtn = ({
  children,
  white,
  as = 'a',
  className,
  ref,
  ...props
}) => {
  const buttonRef = ref || useRef();

  useGSAP(
    (_, contextSafe) => {
      const handleClick = contextSafe(() => {
        gsap.to('.char', {
          keyframes: [
            { yPercent: -100 },
            { yPercent: 100, duration: 0 },
            { yPercent: 0 },
          ],
          ease: 'sine.out',
          stagger: 0.02,
          duration: 0.4,
        });
      });

      buttonRef.current.addEventListener('mouseenter', handleClick);
    },
    { scope: buttonRef }
  );

  return (
    <SplitChar
      {...props}
      as={as}
      ref={buttonRef}
      className={classNames(
        'primary-btn',
        {
          'primary-btn--wh': white,
        },
        className
      )}
    >
      {children}
    </SplitChar>
  );
};

export default PrimaryBtn;
