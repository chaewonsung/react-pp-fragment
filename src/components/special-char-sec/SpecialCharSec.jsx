import React, { useRef } from 'react';
import '@/styles/special-char-sec';
import { LANGUAGES } from '../../data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SpecialCharSec = () => {
  const containerRef = useRef();

  useGSAP(
    () => {
      const specialCharBgTweenConfig = {
        xPercent: [-20, 20, 0, -20, 0, 20],
        yPercent: [20, 0, 15, 15, 50, 0],
      };

      gsap.from('.special-char-sec__bg img', {
        opacity: 0,
        xPercent: (i) => specialCharBgTweenConfig.xPercent[i],
        yPercent: (i) => specialCharBgTweenConfig.yPercent[i],
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
          onEnter: () =>
            gsap.set('.special-char-sec__lang', {
              animationPlayState: 'running',
            }),
        },
      });

      gsap.to('.special-char-sec__text', {
        fontWeight: 700,
        scrollTrigger: {
          trigger: '.special-char-sec__text',
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      className="special-char-sec"
      id="special-characters"
      ref={containerRef}
    >
      <div className="special-char-sec__bg">
        {[...new Array(6)].map((_, i) => (
          <img
            key={i}
            src={require(`@/assets/images/smgkuq-${i + 1}.png`)}
            alt=""
          />
        ))}
      </div>
      <ul className="special-char-sec__lang">
        {LANGUAGES.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
        <li className="and-more">(And more)</li>
      </ul>
      <p className="special-char-sec__text">
        What sticks
        <br />
        to memory,
        <br />
        often, are
        <br />
        those odd
        <br />
        【little
        <br />
        fragments
        <br />
        that have no
        <br />
        beginning
        <br />
        and no end.
        <br />†
      </p>
    </section>
  );
};

export default SpecialCharSec;
