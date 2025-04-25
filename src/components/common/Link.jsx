import classNames from 'classnames';
import React from 'react';

const Link = ({ children, to = '/', className }) => {
  return (
    <a href={to} className={classNames('link', { [className]: !!className })}>
      {children}
    </a>
  );
};

export default Link;
