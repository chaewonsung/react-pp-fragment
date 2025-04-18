import React from 'react';
import PrimaryBtn from '../common/PrimaryBtn';
import { SplitChar } from '../common/SplitText';

const RandomizeText = () => {
  return (
    <div className="randomize-text">
      <Slogan />
      <PrimaryBtn white className="randomize-text__btn">
        randomize
      </PrimaryBtn>
      <Result />
    </div>
  );
};

const Slogan = () => {
  return (
    <div className="randomize-text__slogan">
      <div className="text-wrapper">
        <span className="unlimited">unlimited combinations</span>
        <span className="and-so-many">and so many possibilities</span>
        <span className="unlimited">unlimited combinations</span>
        <span className="and-so-many">and so many possibilities </span>
        <span className="unlimited">unlimited combinations</span>
        <span className="and-so-many">and so many possibilities</span>
      </div>
    </div>
  );
};

const DATA = [
  { text: '① so', ff: 'glare' },
  { text: 'many things', ff: 'glare' },
  { text: '② are possible', ff: 'sans' },
  { text: 'as long as', ff: 'sans' },
  { text: '③ you', ff: 'serif' },
  { text: "don't know", ff: 'serif' },
  { text: 'they', ff: 'text' },
  { text: 'are impossible', ff: 'text' },
];

const Result = () => {
  return (
    <div className="randomize-text__result">
      {DATA.map(({ text, ff }) => (
        <div key={text} className="item-wrapper">
          <div className="item">
            <SplitChar className={ff}>{text}</SplitChar>
            <div className="desc">
              <div>PP Fragment</div>
              <div>Text Bold</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RandomizeText;
