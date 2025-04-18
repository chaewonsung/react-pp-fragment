import React, { useCallback, useRef } from 'react';
import '@/styles/randomize-img-sec';
import PrimaryBtn from '../common/PrimaryBtn';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const RandomizeImgSec = () => {
  const containerRef = useRef();
  const buttonRef = useRef();
  const bgImgArrRef = useRef([]);
  const mainImgArrRef = useRef([]);

  useGSAP(
    (_, contextSafe) => {
      const getRandomOrder = (n) => {
        const arr = Array.from({ length: n }, (_, i) => i);

        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
      };

      const createTargetGetter = ($elemArr) => {
        let order = getRandomOrder($elemArr.length);
        let lastIndex = order.at(-1);

        return () => {
          if (!order.length) {
            do {
              order = getRandomOrder($elemArr.length);
            } while (order[0] === lastIndex);
            lastIndex = order.at(-1);
          }
          return $elemArr[order.shift()];
        };
      };

      const getBgImgTarget = createTargetGetter(bgImgArrRef.current);
      const getMainImgTarget = createTargetGetter(mainImgArrRef.current);

      let randomizeImgTl;

      gsap.set(bgImgArrRef.current, { yPercent: 100, scale: 0.7 });
      gsap.set(mainImgArrRef.current, { scale: 0.7, autoAlpha: 0 });

      function animateNext() {
        const bgImgTarget = getBgImgTarget();
        const posterImgTarget = getMainImgTarget();

        gsap.set(posterImgTarget, { autoAlpha: 1 });
        randomizeImgTl = gsap
          .timeline()
          .to(posterImgTarget, {
            keyframes: [
              { scale: 1, zIndex: 1, duration: 0.6, ease: 'sine.inOut' },
              {
                yPercent: -150,
                zIndex: 2,
                duration: 0.6,
                delay: 3.8,
                onStart: animateNext,
                ease: 'sine.inOut',
              },
            ],
            onComplete: () => {
              gsap.set(posterImgTarget, {
                scale: 0.7,
                zIndex: 0,
                yPercent: 0,
                autoAlpha: 0,
              });
            },
          })
          .to(
            bgImgTarget,
            {
              keyframes: [
                { yPercent: 0, scale: 1, duration: 0.6, ease: 'sine.inOut' },
                {
                  yPercent: -100,
                  scale: 0.7,
                  duration: 0.6,
                  delay: 3.8,
                  ease: 'sine.inOut',
                },
              ],
              delay: 0.15,
              onComplete: () => {
                gsap.set(bgImgTarget, {
                  yPercent: 100,
                  scale: 0.7,
                });
              },
            },
            '<'
          );
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        onEnter: () => randomizeImgTl?.play() || animateNext(),
        onEnterBack: () => randomizeImgTl?.play() || animateNext(),
        onLeave: () => randomizeImgTl?.pause(),
        onLeaveBack: () => randomizeImgTl?.pause(),
      });

      const handleClickBtn = contextSafe(() => {
        gsap.to(randomizeImgTl, {
          progress: 0.85,
          duration: 0,
          overwrite: true,
        });
      });

      buttonRef.current.addEventListener('click', handleClickBtn);

      return () => {
        buttonRef.current.removeEventListener('click', handleClickBtn);
      };
    },
    { scope: containerRef }
  );

  return (
    <section className="randomize-img-sec" ref={containerRef}>
      <div className="randomize-img-sec__sticky">
        <div className="poster">
          <div className="poster__bg-container">
            {[...new Array(8)].map((_, i) => (
              <img
                key={i}
                src={require(`@/assets/images/bg-${i + 1}.png`)}
                alt=""
                ref={(el) => (bgImgArrRef.current[i] = el)}
              />
            ))}
          </div>
          <div className="poster__main-container">
            {[...new Array(7)].map((_, i) => (
              <img
                key={i}
                src={require(`@/assets/images/poster-${i + 1}.png`)}
                alt=""
                ref={(el) => (mainImgArrRef.current[i] = el)}
              />
            ))}
          </div>
          <PrimaryBtn as="button" className="poster__btn" ref={buttonRef}>
            randomize
          </PrimaryBtn>
        </div>
      </div>
      <div className="space"></div>
    </section>
  );
};

export default RandomizeImgSec;
