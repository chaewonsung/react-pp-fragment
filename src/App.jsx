import React, { useEffect } from 'react';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import VisualSec from './components/visual-sec/VisualSec';
import IntroSec from './components/intro-sec/IntroSec';
import ExploreSec from './components/explore-sec/ExploreSec';
import GlyphSetSec from './components/glyph-set-sec/GlyphSetSec';
import FontSamplerSec from './components/font-sampler-sec/FontSamplerSec';
import RandomizeImgSec from './components/randomize-img-sec/RandomizeImgSec';
import SpecialCharSec from './components/special-char-sec/SpecialCharSec';
import NavigationSec from './components/navigation-sec/NavigationSec';
import Footer from './components/footer/Footer';
import './styles/common/common.scss';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import LineSplitter from './components/common/SplitLine';

const App = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  setTimeout(() => ScrollTrigger.refresh(), 10);

  // useGSAP(() => {
  //   gsap
  //     .timeline({
  //       onStart: () => {
  //         scrollTo(0, 0);
  //       },
  //     })
  //     .to('.visual-sec__bg img', {
  //       keyframes: [
  //         {
  //           opacity: 1,
  //           stagger: {
  //             from: 'random',
  //             amount: 2,
  //           },
  //           duration: 3,
  //         },
  //         { scale: 0.85, duration: 0.8, delay: -1, ease: 'power2.inOut' },
  //         {
  //           // x: () => `random(-${innerWidth / 2}, ${innerWidth / 2})`,
  //           xPercent: 'random(-50,50)',
  //           y: () => `random(-${innerHeight / 2}, ${innerHeight})`,
  //           rotate: `random(0, 360)`,
  //           ease: 'power3.out',
  //           duration: 2,
  //         },
  //       ],
  //     })
  //     .to(
  //       '.title-typo .roller-inner',
  //       {
  //         yPercent: 100,
  //         duration: () => gsap.utils.random(2, 4, 1),
  //         ease: 'power4.inOut',
  //       },
  //       '<70%'
  //     )
  //     .to(
  //       '.title-typo__year',
  //       {
  //         scaleX: 1,
  //       },
  //       '<50%'
  //     )
  //     .to(
  //       '.title-typo__ff span',
  //       {
  //         y: 0,
  //         stagger: 0.1,
  //       },
  //       '<'
  //     )
  //     .to(
  //       '.header',
  //       {
  //         y: 0,
  //       },
  //       '<50%'
  //     )
  //     .to(
  //       '.visual-sec__bottom .line',
  //       {
  //         y: 0,
  //         delay: (i) => (i % 2 === 0 ? 0 : 0.1),
  //       },
  //       '<50%'
  //     )
  //     .to(
  //       '.nav',
  //       {
  //         '--gsap-progress': 1,
  //         autoRound: false,
  //       },
  //       '<'
  //     );
  // });

  // useGSAP(() => {
  //   ScrollTrigger.batch('.observe', {
  //     onEnter: (elem) => {
  //       elem.forEach((el) => el.classList.add('active'));
  //     },
  //   });
  // });

  return (
    <>
      {/* <Header />
      <Nav />
      <main>
        <VisualSec />
        <IntroSec />
        <ExploreSec />
        <GlyphSetSec />
        <FontSamplerSec />
        <RandomizeImgSec />
        <SpecialCharSec />
        <NavigationSec />
      </main>
      <Footer /> */}
      <LineSplitter style={{ width: '30%' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
        praesentium harum <span style={{ color: 'pink' }}>temporibus</span>
        <div>
          facere consectetur vitae <span style={{ color: 'blue' }}>fuga est</span> voluptatem quasi.
          Unde?
        </div>
      </LineSplitter>
    </>
  );
};

export default App;
