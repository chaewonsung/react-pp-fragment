import React, { memo, useContext, useEffect, useRef } from 'react';
import Link from '../common/Link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitLine, { SplitChar } from '../common/SplitText';
import { NavContext } from '../../contexts/nav';

const NavContent = () => {
  const containerRef = useRef(null);
  const lnbListRef = useRef({});
  const [isOpen] = useContext(NavContext);
  const timelineRef = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!lnbListRef.current.node) return;

      timelineRef.current = gsap
        .timeline({
          delay: 0.1,
          defaults: {
            duration: 0.4,
          },
        })
        .from('.lnb__typo .char', {
          yPercent: 100,
          stagger: 0.02,
        })
        .from(
          '.lnb__list .line',
          {
            yPercent: 100,
            stagger: 0.05,
          },
          '<0.2'
        )
        .from(
          '.lnb__get-font .char',
          {
            yPercent: 100,
            stagger: 0.02,
          },
          '<0.2'
        )
        .progress(1);
    },
    { dependencies: [lnbListRef.current], scope: containerRef }
  );

  useEffect(
    contextSafe(() => {
      if (isOpen) timelineRef.current.restart();
    }),
    [isOpen]
  );

  return (
    <div
      className="nav__content"
      id="nav-menu"
      aria-hidden={!isOpen + ''}
      ref={containerRef}
    >
      <div className="lnb">
        <SplitChar className="lnb__typo">Fragment</SplitChar>
        <LnbList lnbListRef={lnbListRef} />
        <SplitChar as={Link} className="lnb__get-font">
          Get 〖the font〗
        </SplitChar>
      </div>
      <div className="gnb">
        <div className="gnb__top">
          <div>
            <Link to="/">Pangram Pangram® Foundry</Link>
          </div>
          <div>
            <Link to="/">Locomotive</Link>
          </div>
        </div>
        <div className="gnb__bottom">
          <Link to="/">Terms & Conditions</Link>
          <Link to="/">FAQ</Link>
          <Link to="/">Contact</Link>
        </div>
      </div>
    </div>
  );
};

const LnbList = memo(({ lnbListRef }) => {
  return (
    <SplitLine as="ul" className="lnb__list" ref={lnbListRef}>
      {[
        'introduction',
        'from sans to serif',
        'glyph set',
        'font sampler',
        'fragment in use',
        'special characters',
      ].map((v) => (
        <li key={v}>
          <Link to={`#${v.split().join('-')}`}>{v}</Link>
        </li>
      ))}
    </SplitLine>
  );
});

LnbList.displayName = 'LnbList';

export default NavContent;
