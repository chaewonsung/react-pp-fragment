import React, { useRef } from 'react';
import '@/styles/navigation-sec';
import CardList from './CardList';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const NavigationSec = () => {
  const containerRef = useRef();

  useGSAP(
    () => {
      gsap.set('.navigation-sec__bg img', { opacity: 0 });

      gsap.set('.navigation-sec .card', {
        y: '100vh',
      });

      const navBgTweenConfig = {
        from: {
          xPercent: [0, -25, 50, -20, 30, -30],
          yPercent: [-25, -100, -50, 25, -40, -5],
          rotate: [0, -45, 45, -30, -25, -20],
        },
        to: {
          xPercent: [0, -25, 50, -20, 30, -30],
          yPercent: [-25, -100, 20, 25, -40, -5],
          rotate: [0, 45, 25, 30, 25, 20],
        },
      };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            endTrigger: '.navigation-sec__sticky + .space',
            end: 'bottom bottom',
            scrub: 1,
          },
        })
        .to('.navigation-sec__bg img', {
          keyframes: {
            '0%': {
              yPercent: (i) => navBgTweenConfig.from.yPercent[i],
              xPercent: (i) => navBgTweenConfig.from.xPercent[i],
              rotate: (i) => navBgTweenConfig.from.rotate[i],
              opacity: 0,
            },
            '25%': { yPercent: 0, xPercent: 0, rotate: 0, opacity: 1 },
            '75%': { yPercent: 0, xPercent: 0, rotate: 0, opacity: 1 },
            '100%': {
              yPercent: (i) => navBgTweenConfig.to.yPercent[i],
              xPercent: (i) => navBgTweenConfig.to.xPercent[i],
              rotate: (i) => navBgTweenConfig.to.rotate[i],
              opacity: 0,
            },
          },
          duration: 100,
        })
        .to(
          '.navigation-sec .card',
          {
            keyframes: {
              '0%': { y: '100vh' },
              '25%': { y: 0 },
              '75%': { y: 0 },
              '100%': { y: '-100vh' },
            },
            stagger: 3,
            duration: 60,
          },
          20
        );
    },
    { scope: containerRef }
  );

  return (
    <section className="navigation-sec" ref={containerRef}>
      <div className="navigation-sec__sticky">
        <div className="navigation-sec__bg">
          {[...new Array(6)].map((_, i) => (
            <img
              key={i}
              src={require(`@/assets/images/a-cap-${i + 1}.png`)}
              alt=""
            />
          ))}
        </div>
        <CardList />
      </div>
      <div className="space"></div>
    </section>
  );
};

export default NavigationSec;
