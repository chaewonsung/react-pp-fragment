import React, { useRef } from 'react';
import '@/styles/footer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedLineWrapper from '../common/AnimatedLineWrapper';

const Footer = () => {
  const containerRef = useRef();

  useGSAP(
    () => {
      gsap.to('span', {
        scaleY: 1,
        scaleX: 1.2,
        fontWeight: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          end: 'bottom bottom',
          scrub: 1,
          onEnter: () => gsap.from('.line', { yPercent: 100, stagger: 0.1 }),
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <footer className="footer">
      <div className="credits">
        <h2>Credits</h2>
        <div className="credits__content">
          <div className="credits__typeface">
            <h3 className="observe">Typeface</h3>
            <div className="paras">
              <AnimatedLineWrapper>
                PP Fragment is born from vintage lettering and signs, bridging
                19th-century letterforms and contemporary typography ● Pangram
                Pangram’s 35th release uses the latest technology, gracefully
                oscillating between an elegant, highly contrasted Serif face, a
                revival mid-serif called Glare, and a strong Sans, each with
                distinct features yet perfectly complementary.
              </AnimatedLineWrapper>
              <AnimatedLineWrapper>
                It comes in 4 preset cuts, Sans, Serif, Glare, and Text, each
                with unique personalities and quirks. Each weight counts 581
                glyphs with plenty of alternate symbols to achieve the
                best-desired result for your next design.
              </AnimatedLineWrapper>
              <AnimatedLineWrapper>
                Its power and versatility also comes from its 32 very distinct
                and unique weights! These weights were carefully crafted and cut
                for maximum breath of ability ▲ PP Fragment doesn’t disappoint
                and will surely be one of your best tools in your next design
                endeavour.
              </AnimatedLineWrapper>
            </div>
          </div>
          <div className="credits__visuals">
            <h3 className="observe">Visuals</h3>
            <AnimatedLineWrapper className="line-animation-trigger">
              This (awesome) website—courtesy of Locomotive. Our philosophy is
              built on people who love creating, learning and growing together.
              A team with ties that transcend the workplace.
              <span className="mt">
                Visual Artist <a href="">@barthur</a>
              </span>
            </AnimatedLineWrapper>
          </div>
        </div>
      </div>
      <div className="footer__copyright" ref={containerRef}>
        <span>Ω</span>
        <AnimatedLineWrapper as="div">
          <div>Copyright &copy; 2022 Pangram Pangram Foundry</div>
          <div>Website by Locomotive</div>
        </AnimatedLineWrapper>
      </div>
    </footer>
  );
};

export default Footer;
