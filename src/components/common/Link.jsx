import React from 'react';

const Link = ({ children, to = '/' }) => {
  return (
    <a href={to} className="link">
      {children}
    </a>
  );
};

export default Link;
