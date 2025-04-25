import React, { useRef } from 'react';
import '@/styles/explore-sec';
import RandomizeText from './RandomizeText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Roller from '../common/Roller';

const ExploreSec = () => {
  const containerRef = useRef();

  useGSAP(
    () => {
      const exploreRollerTween = gsap.to('.roller-inner', {
        yPercent: 100,
        duration: () => gsap.utils.random(1, 3),
        ease: 'power2.inOut',
        paused: true,
      });

      const exploreBgTweenConfig = {
        from: {
          xPercent: [50, -25, -50],
          yPercent: [-25, -100, 15],
          rotate: [20, -30, -45],
        },
        to: { xPercent: [15, -15, -15], yPercent: [-100, 60, 60] },
      };

      gsap.set('.explore-sec__bg img', {
        opacity: 0,
      });

      gsap.to('.explore-sec__bg img', {
        keyframes: {
          '0%': {
            yPercent: (i) => exploreBgTweenConfig.from.yPercent[i],
            xPercent: (i) => exploreBgTweenConfig.from.xPercent[i],
            rotate: (i) => exploreBgTweenConfig.from.rotate[i],
            opacity: 0,
          },
          '25%': {
            yPercent: 0,
            xPercent: 0,
            rotate: 0,
            opacity: 1,
          },
          '75%': {
            yPercent: 0,
            xPercent: 0,
            rotate: 0,
            opacity: 1,
          },
          '100%': {
            yPercent: (i) => exploreBgTweenConfig.to.yPercent[i],
            xPercent: (i) => exploreBgTweenConfig.to.xPercent[i],
            opacity: 0,
          },
        },
        duration: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          endTrigger: '.explore-sec__randomize-text',
          end: '50% bottom',
          scrub: 1,
          onUpdate: ({ progress }) => {
            if (progress >= 0.3 && exploreRollerTween.progress() === 0) {
              exploreRollerTween.play();
            }
          },
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="explore-sec">
      <div className="explore-sec__intro">
        <div className="explore-sec__bg">
          <img src={require('@/assets/images/a-1.png')} alt="" />
          <img src={require('@/assets/images/a-2.png')} alt="" />
          <img src={require('@/assets/images/a-3.png')} alt="" />
        </div>
        <div className="explore-sec__typo" aria-hidden="true">
          <div className="roller-container">
            {[...'4 cuts'].map((char, i) => (
              <Roller key={i}>{char}</Roller>
            ))}
          </div>
          <div className="roller-container">
            {[...'9 styles'].map((char, i) => (
              <Roller key={i}>{char}</Roller>
            ))}
          </div>
          <div className="roller-container">
            {[...'581 glyphs'].map((char, i) => (
              <Roller key={i}>{char}</Roller>
            ))}
          </div>
        </div>
      </div>
      <div className="space"></div>
      <RandomizeText />
      <div className="space"></div>
    </section>
  );
};

export default ExploreSec;
