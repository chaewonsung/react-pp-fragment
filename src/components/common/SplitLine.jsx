import React from 'react';

const SplitLine = ({ html, as: Tag = 'div', ref, children, ...props }) => {
  return (
    <Tag
      {...props}
      ref={ref}
      {...(html
        ? { dangerouslySetInnerHTML: { __html: html } }
        : {
            children,
            style: { ...props.style, wordBreak: 'keep-all' },
          })}
    />
  );
};

export default SplitLine;
