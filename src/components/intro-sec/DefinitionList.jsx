import React from 'react';
import AnimatedLineWrapper from '../common/AnimatedLineWrapper';

const DATA = {
  ['Styles']: '4 Cuts x 9 Styles with 581 Glyphs each',
  ['Designers']: 'Francesca Bolognini Mat Desjardins',
  ['Release Date']: 'June 2022',
  ['Version']: '1.00',
  ['Available Formats']: 'OTF, TTF, WOFF, WOFF2, EOT',
};

const DefinitionList = () => {
  return (
    <AnimatedLineWrapper as="dl" className="observe">
      {Object.keys(DATA).map((key) => (
        <div key={key}>
          <dt>{key}</dt>
          <dd>{DATA[key]}</dd>
        </div>
      ))}
    </AnimatedLineWrapper>
  );
};

export default DefinitionList;
