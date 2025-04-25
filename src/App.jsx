import React, { useEffect, useState } from 'react';
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
import toPX from './utils/toPX';
import NavContextProvider from './contexts/nav';

const loadAnimTlConfig = {
  x: [
    -50, -50, -20, 20, 10, 30, -20, 40, 50, 60, -30, -20, -15, -5, -40, -10, 15,
    20, 5, -5, 40, 20, 7, 40, -10,
  ],
  y: [
    -40, -20, -50, 20, 10, -40, -50, -10, -90, -20, -20, 50, 30, 50, 20, 20,
    -20, 50, 70, 40, -15, 30, 20, 10, 50,
  ],
  rotate: [
    10, 45, -45, -15, 45, -25, -30, -35, 45, -30, 25, 15, -30, -10, -20, 10,
    -10, -30, -10, 25, 15, -10, -5, -10, 10,
  ],
};

const App = () => {
  const [isMounted, setIsMounted] = useState(false);

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  setTimeout(() => ScrollTrigger.refresh(), 10);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!isMounted) return;

    gsap
      .timeline({
        onStart: () => {
          scrollTo(0, 0);
        },
      })
      .addLabel('label-1')
      .to('.visual-sec__bg img', {
        keyframes: [
          {
            opacity: 1,
            stagger: {
              from: 'random',
              amount: 2,
            },
            duration: 3,
          },
          { scale: 0.85, duration: 0.8, delay: -1, ease: 'power2.inOut' },
          {
            x: (i) => toPX(loadAnimTlConfig.x[i] + 'vw'),
            y: (i) => toPX(loadAnimTlConfig.y[i] + 'vh'),
            rotate: (i) => loadAnimTlConfig.rotate[i],
            ease: 'power3.out',
            duration: 2,
          },
        ],
      })
      .to('.visual-sec__bg > div', {
        y: (i) => (i % 2 ? '+=50' : '-=50'),
        repeat: -1,
        yoyo: true,
        ease: 'none',
        duration: 3,
      })
      .to(
        '.title-typo .roller-inner',
        {
          yPercent: 100,
          duration: () => gsap.utils.random(2, 4, 1),
          ease: 'power4.inOut',
        },
        'label-1+=4.5'
      )
      .to(
        '.title-typo__year',
        {
          scaleX: 1,
        },
        '<50%'
      )
      .to(
        '.title-typo__ff span',
        {
          y: 0,
          stagger: 0.1,
        },
        '<'
      )
      .to(
        '.header',
        {
          y: 0,
        },
        '<50%'
      )
      .to(
        '.visual-sec__bottom .line',
        {
          y: 0,
          delay: (i) => (i % 2 === 0 ? 0 : 0.1),
        },
        '<50%'
      )
      .to(
        '.nav',
        {
          '--gsap-progress': 1,
          autoRound: false,
        },
        '<'
      );
  }, [isMounted]);

  useGSAP(() => {
    ScrollTrigger.batch('.observe', {
      onEnter: (elem) => {
        elem.forEach((el) => el.classList.add('active'));
      },
    });
  });

  return (
    <NavContextProvider>
      <Header />
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
      <Footer />
    </NavContextProvider>
  );
};

export default App;
