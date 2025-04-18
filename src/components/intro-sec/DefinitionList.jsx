import React from 'react';
import SplitText, { SplitLine } from '../common/SplitText';

const DATA = {
  ['Styles']: '4 Cuts x 9 Styles with 581 Glyphs each',
  ['Designers']: 'Francesca Bolognini Mat Desjardins',
  ['Release Date']: 'June 2022',
  ['Version']: '1.00',
  ['Available Formats']: 'OTF, TTF, WOFF, WOFF2, EOT',
};

const DefinitionList = () => {
  return (
    <dl className="observe">
      {Object.keys(DATA).map((key) => (
        <div key={key}>
          <SplitLine as="dt">{key}</SplitLine>
          <SplitLine as="dd">{DATA[key]}</SplitLine>
        </div>
      ))}
    </dl>
  );
};

export default DefinitionList;
