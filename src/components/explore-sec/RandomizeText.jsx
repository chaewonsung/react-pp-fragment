import React, { useImperativeHandle, useRef } from 'react';
import PrimaryBtn from '../common/PrimaryBtn';
import { SplitChar } from '../common/SplitText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { throttle } from 'lodash';

const RandomizeText = () => {
  const containerRef = useRef();
  const resultRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add(
        { isNotMobile: '(min-width: 769px)', isMobile: '(max-width: 768px)' },
        (context) => {
          const { isNotMobile } = context.conditions;
          const repeatDelay = isNotMobile ? 2 : 0;
          const delay = isNotMobile ? 0 : 2;
          const xDuration = 1;
          const xDelay = 0.2;
          const fwDuration = 0.5;
          const fwDelay = xDuration - fwDuration;

          gsap.set('.randomize-text__result .item', {
            transition: `font-weight ${fwDuration}s ${fwDelay}s`,
          });

          const randomizeTextTl = gsap
            .timeline({
              repeat: -1,
              repeatRefresh: true,
              repeatDelay,
              scrollTrigger: {
                trigger: containerRef.current,
                toggleActions: 'play pause play pause',
                endTrigger: containerRef.current.nextElementSibling,
                onToggle: ({ isActive }) => {
                  gsap.set('.randomize-text__slogan .text-wrapper', {
                    animationPlayState: isActive ? 'running' : 'paused',
                  });
                },
              },
            })
            .set('.randomize-text__result .item-wrapper', {
              '--fw': 'random(100, 900, 100)',
              delay,
            });

          if (isNotMobile) {
            randomizeTextTl.to('.randomize-text__result .item', {
              x: (i) => resultRef.current.getRandomRange(i),
              ease: 'power2.inOut',
              duration: xDuration,
              delay: xDelay,
            });
          }

          randomizeTextTl.time(randomizeTextTl.duration());

          const handleButtonClick = contextSafe(() => {
            randomizeTextTl.invalidate().time(isNotMobile ? xDelay : delay);
          });

          buttonRef.current.addEventListener('click', handleButtonClick);

          return () => {
            gsap.set('.randomize-text__result .item', { clearProps: 'all' });
            buttonRef.current.removeEventListener('click', handleButtonClick);
          };
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div className="explore-sec__randomize-text" ref={containerRef}>
      <div className="randomize-text">
        <Slogan />
        <PrimaryBtn white className="randomize-text__btn" ref={buttonRef}>
          randomize
        </PrimaryBtn>
        <Result resultRef={resultRef} />
      </div>
    </div>
  );
};

const Slogan = () => {
  return (
    <div className="randomize-text__slogan">
      <div className="text-wrapper">
        {[...new Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="unlimited">unlimited combinations</span>
            <span className="and-so-many">and so many possibilities</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const DATA = [
  { text: '① so', ff: 'glare' },
  { text: 'many things', ff: 'glare' },
  { text: '② are possible', ff: 'sans' },
  { text: 'as long as', ff: 'sans' },
  { text: '③ you', ff: 'serif' },
  { text: "don't know", ff: 'serif' },
  { text: 'they', ff: 'text' },
  { text: 'are impossible', ff: 'text' },
];

const Result = ({ resultRef }) => {
  const containerRef = useRef(null);
  const itemWrapperArrRef = useRef([]);
  const fakeItemArrRef = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: containerRef.current,
        once: true,
      });

      itemWrapperArrRef.current.forEach((itemWrapper, i) => {
        const q = gsap.utils.selector(itemWrapper);

        tl.from(q('.char'), { yPercent: 100, stagger: 0.04 }, i * 0.1);
      });
    },
    { scope: containerRef }
  );

  useImperativeHandle(resultRef, () => ({
    getRandomRange: (i) => {
      const left = fakeItemArrRef.current[i].offsetLeft * -1;
      const center =
        (fakeItemArrRef.current[i].parentNode.offsetWidth / 2 -
          fakeItemArrRef.current[i].offsetWidth / 2) *
        -1;
      const right = 0;

      return `random([${left}, ${center}, ${right}])`;
    },
  }));

  return (
    <div className="randomize-text__result" ref={containerRef}>
      {DATA.map(({ text, ff }, i) => (
        <div
          key={text}
          className={`item-wrapper ${ff}`}
          ref={(el) => (itemWrapperArrRef.current[i] = el)}
        >
          <div
            className="fake-item"
            aria-hidden="true"
            ref={(el) => (fakeItemArrRef.current[i] = el)}
          >
            {text}
          </div>
          <div className="item">
            <SplitChar className="char-wrapper">{text}</SplitChar>
            <div className="desc">
              <div>PP Fragment</div>
              <div>Text Bold</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RandomizeText;
