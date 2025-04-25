import React, { useEffect } from 'react';
import '@/styles/visual-sec';
import TitleTypo from './TitleTypo';
import SplitLine from '../common/SplitText';

const VisualSec = () => {
  return (
    <section className="visual-sec">
      <div className="visual-sec__bg">
        {[...new Array(25)].map((_, i) => (
          <div key={i}>
            <img src={require(`@/assets/images/fragment-${i + 1}.png`)} />
          </div>
        ))}
      </div>
      <TitleTypo />
      <SplitLine as="div" className="visual-sec__bottom">
        <div>
          <div>A New 【Free to Try】 Font</div>
          <div>by Francesca Bolognini & Mathieu Desjardins</div>
        </div>
        <div>
          <div>Available exclusively at</div>
          <a>pangrampangram.com</a>
        </div>
      </SplitLine>
    </section>
  );
};

export default VisualSec;
