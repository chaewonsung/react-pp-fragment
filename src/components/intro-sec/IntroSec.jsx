import React from 'react';
import '@/styles/intro-sec';
import { SplitLine } from '../common/SplitText';
import DefinitionList from './DefinitionList';
import PrimaryBtn from '../common/PrimaryBtn';

const IntroSec = () => {
  return (
    <section className="intro-sec" id="introduction">
      <div className="intro-sec__top">
        <SplitLine>
          PP Fragment is born from vintage lettering and signs, bridging
          19th-century letterforms and contemporary typography ✳ Pangram
          Pangram’s 35th release uses the latest technology.
        </SplitLine>
        <SplitLine>
          Gracefully oscillating between an elegant, highly contrasted Serif
          face, a revival mid-serif called Glare, and a strong Sans, each with
          distinct features yet perfectly complementary.
        </SplitLine>
      </div>
      <div className="intro-sec__bottom">
        <div className="intro-sec__bottom-left">
          <img src={require('@/assets/images/intro.jpg')} alt="" />
          <DefinitionList />
        </div>
        <div className="intro-sec__bottom-right">
          <div className="text">
            <SplitLine>
              It comes in 4 preset cuts, Sans, Serif, Glare, and Text, each with
              unique personalities and quirks. Each weight counts 581 glyphs
              with plenty of alternate symbols to achieve the best-desired
              result for your next design.
            </SplitLine>
            <SplitLine>
              Its power and versatility also comes from its 32 very distinct and
              unique weights! These weights were carefully crafted and cut for
              maximum breath of ability ▲ PP Fragment doesn’t disappoint and
              will surely be one of your best tools in your next design
              endeavour.
            </SplitLine>
          </div>
          <PrimaryBtn>read the interview on PP® Fragment</PrimaryBtn>
        </div>
      </div>
    </section>
  );
};

export default IntroSec;
