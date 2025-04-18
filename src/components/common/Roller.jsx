import classNames from 'classnames';
import React from 'react';

const Roller = ({ children: char, className }) => {
  return (
    <span className={classNames('roller', className)}>
      <span className="roller-inner">
        <i>{char}</i>
        <i>{char}</i>
        <i>{char}</i>
        <i>{char}</i>
      </span>
      <i>{char}</i>
    </span>
  );
};

export default Roller;
