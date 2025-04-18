import React, { useRef } from 'react';
import useSplitText from '../../hooks/useSplitText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getGsapCharTween } from '../../utils/gsapTween';

const CARD_DATA = [
  { id: 1, header: ['①', 'BUY'], text: 'buy PP® Fragment' },
  { id: 2, header: ['②', 'TRY FOR FREE'], text: 'try PP® Fragment for free' },
  {
    id: 3,
    header: ['③', 'PP® WALLPAPERS'],
    text: 'enjoy PP® Fragment wallpapers',
  },
];

const CardList = () => {
  return (
    <div className="navigation-sec__card-list">
      {CARD_DATA.map((props) => (
        <div key={props.id} className="card-wrapper">
          <Card {...props} />
        </div>
      ))}
    </div>
  );
};

const Card = ({ header, text }) => {
  const containerRef = useRef();
  const lineArrRef = useRef([]);
  const textRef = useRef();
  const [splittedText] = useSplitText(textRef, 'line, char');

  useGSAP(
    (_, contextSafe) => {
      if (!splittedText.length) return;

      const tl = gsap.timeline({ paused: true });

      lineArrRef.current.forEach((line, i) => {
        const tween = getGsapCharTween(line.children);
        tl.add(tween, i * 0.08);
      });

      const handleMouseenter = contextSafe(() => {
        tl.restart();
      });

      containerRef.current.addEventListener('mouseenter', handleMouseenter);

      return () => {
        containerRef.current.removeEventListener(
          'mouseenter',
          handleMouseenter
        );
      };
    },
    { dependencies: [splittedText], scope: containerRef }
  );

  return (
    <a className="card" href="/" ref={containerRef}>
      <div className="card__header">
        <span>{header[0]}</span>
        <span>{header[1]}</span>
      </div>
      <div className="card__text" ref={textRef}>
        {splittedText.length
          ? splittedText.map(({ char }, i) => (
              <div
                className="line-wrapper"
                key={i}
                ref={(el) => (lineArrRef.current[i] = el)}
              >
                {char.map((c, i) => (
                  <span className="char" key={i}>
                    {c}
                  </span>
                ))}
              </div>
            ))
          : text}
      </div>
      <div className="card__arrow">→</div>
    </a>
  );
};

export default CardList;
