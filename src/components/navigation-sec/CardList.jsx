import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getGsapCharTween } from '../../utils/gsapTween';
import SplitLine from '../common/SplitText';

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
  const textRef = useRef();
  const [_, setState] = useState();

  useGSAP(
    (_, contextSafe) => {
      if (!textRef.current.node) return;

      const lines = [...textRef.current.node.children];
      const tl = gsap.timeline({ paused: true });

      lines.forEach((line, i) => {
        const q = gsap.utils.selector(line);
        const tween = getGsapCharTween(q('.char'));
        tl.add(tween, i * 0.08);
      });

      const handleMouseenter = contextSafe(() => tl.restart());

      containerRef.current.addEventListener('mouseenter', handleMouseenter);

      return () => {
        containerRef.current.removeEventListener(
          'mouseenter',
          handleMouseenter
        );
      };
    },
    { dependencies: [textRef.current], scope: containerRef }
  );

  return (
    <a className="card" href="/" ref={containerRef}>
      <div className="card__header">
        <span>{header[0]}</span>
        <span>{header[1]}</span>
      </div>
      <SplitLine
        as="div"
        splitChar
        className="card__text"
        ref={textRef}
        setParentState={setState}
      >
        {text}
      </SplitLine>
      <div className="card__arrow">→</div>
    </a>
  );
};

export default CardList;
