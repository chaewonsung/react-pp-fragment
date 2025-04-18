import React from 'react';
import Roller from '../common/Roller';

const TitleTypo = () => {
  return (
    <div className="title-typo">
      <div className="title-typo__title" aria-label="pp fragment">
        <div>
          <div className="title-typo__year">②⓪</div>
          <div>
            <Roller>p</Roller>
            <Roller className="serif">p</Roller>
          </div>
          <div className="title-typo__year">②②</div>
        </div>
        <div>
          <div>
            {[...'frag'].map((char, i) => (
              <Roller key={i}>{char}</Roller>
            ))}
          </div>
          <div className="serif">
            {[...'ment'].map((char, i) => (
              <Roller key={i}>{char}</Roller>
            ))}
          </div>
        </div>
      </div>
      <div className="title-typo__ff">
        <span className="sans">sans</span>
        <span className="glare">glare</span>
        <span className="serif">serif</span>
        <span className="text">text</span>
      </div>
    </div>
  );
};

export default TitleTypo;
