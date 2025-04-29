import React, { useRef } from 'react';
import useSplitLine from '../../hooks/useSplitLine';

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

const SplitLineProcessor = ({ as, children }) => {
  const containerRef = useRef(null);
  const [html] = useSplitLine(containerRef);

  return (
    <SplitLine html={html} ref={containerRef} as={as}>
      {children}
    </SplitLine>
  );
};

export { SplitLineProcessor };
export default SplitLine;
