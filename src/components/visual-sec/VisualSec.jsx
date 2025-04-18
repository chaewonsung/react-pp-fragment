import React from 'react';
import '@/styles/visual-sec';
import TitleTypo from './TitleTypo';
import Link from '../common/Link';
import { SplitLine } from '../common/SplitText';

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
      <div className="visual-sec__bottom">
        <div>
          <SplitLine anim={false} as="div">
            A New 【Free to Try】 Font
          </SplitLine>
          <SplitLine anim={false} as="div">
            by Francesca Bolognini & Mathieu Desjardins
          </SplitLine>
        </div>
        <div>
          <SplitLine anim={false} as="div">
            Available exclusively at
          </SplitLine>
          <SplitLine anim={false} as="a">
            pangrampangram.com
          </SplitLine>
        </div>
      </div>
    </section>
  );
};

export default VisualSec;
