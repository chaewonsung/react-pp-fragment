import { debounce } from 'lodash';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return '';
    case 'SPLIT_LINE':
      return action.payload;
    default:
      return state;
  }
};

const SplitLine = ({ children, as: Tag = 'div', ...props }) => {
  const containerRef = useRef(null);
  const [html, dispatch] = useReducer(reducer, '');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const range = document.createRange();

    const isBlock = (node) => {
      const display = window.getComputedStyle(node).display;
      return (
        display === 'block' || node.tagName === 'DIV' || node.tagName === 'P'
      );
    };

    const getAttributesString = (node) => {
      const attrs = [];

      for (const attr of node.attributes) {
        const name = attr.name;
        const value = attr.value;

        attrs.push(`${name}="${value}"`);
      }

      return attrs.join(' ');
    };

    const processNode = (node) => {
      const HTMLtextChunks = [];
      let currentLine = '';
      let prevTop = -Infinity;

      const commit = () => {
        if (currentLine) {
          HTMLtextChunks.push(
            `<span class="line-wrapper" style="display: block"><span class="line" style="display: inline-block">${currentLine}</span></span>`
          );
          currentLine = '';
        }
      };

      const commitAfterDetectTopShift = (top) => {
        if (Math.abs(top - prevTop) > 1) {
          commit();
          prevTop = top;
        }
      };

      const processChildNodes = (parent) => {
        const children = Array.from(parent.childNodes);

        for (const child of children) {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent;
            const words = text.match(/.*?\s|.+$/g);
            let index = 0;

            for (let i = 0; i < words.length; i++) {
              const word = words[i];
              const start = index;
              const end = index + word.length;

              range.setStart(child, start);
              range.setEnd(child, end);

              const top = range.getBoundingClientRect().top;
              commitAfterDetectTopShift(top);

              currentLine += word;
              index = end;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const tag = child.tagName.toLowerCase();

            if (isBlock(child)) {
              commit();
              HTMLtextChunks.push(`<${tag}>`);
              processChildNodes(child);
              commit();
              HTMLtextChunks.push(`</${tag}>`);
            } else {
              const top = child.getBoundingClientRect().top;
              commitAfterDetectTopShift(top);

              const attrs = getAttributesString(child);
              currentLine += `<${tag} ${attrs}>${child.innerHTML}</${tag}>`;
            }
          }
        }
      };

      processChildNodes(node);
      commit();

      return HTMLtextChunks.join('');
    };

    const processedHtml = processNode(container);
    dispatch({ type: 'SPLIT_LINE', payload: processedHtml });

    const handleResize = debounce(() => {
      flushSync(() => dispatch({ type: 'INITIALIZE' }));
      const processedHtml = processNode(container);
      dispatch({ type: 'SPLIT_LINE', payload: processedHtml });
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {html ? (
        <Tag
          dangerouslySetInnerHTML={{ __html: html }}
          {...props}
          style={{ ...props.style }}
        />
      ) : (
        <Tag
          ref={containerRef}
          style={{
            ...props.style,
            wordBreak: 'keep-all',
          }}
        >
          {children}
        </Tag>
      )}
    </>
  );
};

export default SplitLine;
