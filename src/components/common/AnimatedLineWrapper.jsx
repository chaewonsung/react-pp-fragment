import React, { useEffect, useRef, useState } from 'react';
import SplitLine from './SplitText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AnimatedLineWrapper = ({ children, externalTriggerRef, ...props }) => {
  const containerRef = useRef(null);
  const [state, setState] = useState();

  useGSAP(
    () => {
      const container = containerRef.current.node;
      if (!container) return;

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
            onLeave: containerRef.current.cleanup,
          },
        }
      );
    },
    { dependencies: [containerRef.current] }
  );

  return (
    <SplitLine {...props} ref={containerRef} setParentState={setState}>
      {children}
    </SplitLine>
  );
};

export default AnimatedLineWrapper;
