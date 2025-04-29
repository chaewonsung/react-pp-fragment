import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useSplitLine from '../../hooks/useSplitLine';
import SplitLine from './SplitLine';

const AnimatedLineWrapper = ({
  children,
  externalTriggerRef,
  as = 'p',
  ...props
}) => {
  const containerRef = useRef(null);
  const [html, cleanup] = useSplitLine(containerRef);

  useGSAP(
    () => {
      if (!html) return;

      const container = containerRef.current;
      const q = gsap.utils.selector(container);

      gsap.fromTo(
        q('.line'),
        { yPercent: 100 },
        {
          yPercent: 0,
          stagger: 0.06,
          scrollTrigger: {
            trigger: externalTriggerRef?.current || container,
            once: true,
            start: '50% bottom',
            onLeave: cleanup,
          },
        }
      );
    },
    { dependencies: [html] }
  );

  return (
    <SplitLine {...props} html={html} ref={containerRef} as={as}>
      {children}
    </SplitLine>
  );
};

export default AnimatedLineWrapper;
