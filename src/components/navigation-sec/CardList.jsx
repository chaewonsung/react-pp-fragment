import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getGsapCharTween } from '../../utils/gsapTween';
import SplitLine from '../common/SplitLine';
import useSplitLine from '../../hooks/useSplitLine';

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
  const containerRef = useRef(null);
  const tlRef = useRef(gsap.timeline({ paused: true }));

  useGSAP((_, contextSafe) => {
    const handleMouseenter = contextSafe(() => tlRef.current.restart());

    containerRef.current.addEventListener('mouseenter', handleMouseenter);
    return () => {
      containerRef.current.removeEventListener('mouseenter', handleMouseenter);
    };
  });

  return (
    <a className="card" href="/" ref={containerRef}>
      <div className="card__header">
        <span>{header[0]}</span>
        <span>{header[1]}</span>
      </div>
      <CardText tlRef={tlRef}>{text}</CardText>
      <div className="card__arrow">→</div>
    </a>
  );
};

const CardText = ({ children, tlRef }) => {
  const containerRef = useRef(null);
  const [html] = useSplitLine(containerRef, true);

  useGSAP(
    () => {
      if (!html) return;

      const lines = [...containerRef.current.children];
      const tl = tlRef.current;

      lines.forEach((line, i) => {
        const q = gsap.utils.selector(line);
        const tween = getGsapCharTween(q('.char'));
        tl.add(tween, i * 0.08);
      });

      return () => {
        tl.remove();
      };
    },
    { dependencies: [html] }
  );

  return (
    <SplitLine html={html} ref={containerRef} className="card__text">
      {children}
    </SplitLine>
  );
};

export default CardList;
