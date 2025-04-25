import { debounce } from 'lodash';
import React, {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
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

const SplitLine = ({
  children,
  as: Tag = 'p',
  splitChar = false,
  ref,
  setParentState,
  ...props
}) => {
  const initialContainerRef = useRef(null);
  const containerRef = useRef(null);
  const cleanupRef = useRef(() => {});
  const [html, dispatch] = useReducer(reducer, '');

  useEffect(() => {
    if (setParentState) setParentState(html);
  }, [html]);

  useImperativeHandle(
    ref,
    () => ({
      cleanup: cleanupRef.current,
      node: containerRef.current,
    }),
    [cleanupRef.current, containerRef.current]
  );

  useLayoutEffect(() => {
    const container = initialContainerRef.current;
    if (!container) return;

    const range = document.createRange();

    const isBlock = (node) => {
      const display = window.getComputedStyle(node).display;
      return (
        display === 'block' ||
        display === 'flex' ||
        node.tagName === 'DIV' ||
        node.tagName === 'P'
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
          const html = splitChar
            ? currentLine
            : `<span class="line" style="display: inline-block">${currentLine}</span>`;

          HTMLtextChunks.push(
            `<span class="line-wrapper" style="display: block">${html}</span>`
          );
          currentLine = '';
        }
      };

      const isTopShifted = (top) => {
        return Math.abs(top - prevTop) > 1;
      };

      const commitAfterDetectTopShift = (top) => {
        if (isTopShifted(top)) {
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

              const result = splitChar
                ? `<span class="word" style="white-space: nowrap;">${word
                    .split('')
                    .reduce(
                      (acc, char) =>
                        (acc += `<span class="char" style="display: inline-block;">${
                          char === ' ' ? '\u00A0' : char
                        }</span>`),
                      ''
                    )}</span>`
                : word;

              currentLine += result;
              index = end;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const tag = child.tagName.toLowerCase();
            const attrs = getAttributesString(child);

            if (isBlock(child)) {
              commit();
              HTMLtextChunks.push(`<${tag} ${attrs}>`);
              processChildNodes(child);
              commit();
              HTMLtextChunks.push(`</${tag}>`);
            } else {
              const top = child.getBoundingClientRect().top;
              commitAfterDetectTopShift(top);

              if (splitChar) {
                currentLine += `<${tag} ${attrs}>`;
                processChildNodes(child);
                currentLine += `</${tag}>`;
              } else {
                currentLine += `<${tag} ${attrs}>${child.innerHTML}</${tag}>`;
              }
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

    const cleanup = () => {
      window.removeEventListener('resize', handleResize);
      dispatch({ type: 'INITIALIZE' });
    };

    cleanupRef.current = cleanup;

    return cleanup;
  }, []);

  return (
    <>
      {html ? (
        <Tag
          dangerouslySetInnerHTML={{ __html: html }}
          ref={containerRef}
          {...props}
        />
      ) : (
        <Tag
          {...props}
          style={{
            ...props.style,
            wordBreak: 'keep-all',
          }}
          ref={initialContainerRef}
        >
          {children}
        </Tag>
      )}
    </>
  );
};

const SplitChar = ({ as: Tag = 'div', children, wrap = true, ...props }) => {
  const newChildren = children.split('').map((c, i) => (
    <span key={i} className="char" style={{ display: 'inline-block' }}>
      {c === ' ' ? '\u00A0' : c}
    </span>
  ));

  return (
    <Tag {...props}>
      {wrap ? (
        <span className="line-wrapper" style={{ display: 'inline-block' }}>
          {newChildren}
        </span>
      ) : (
        newChildren
      )}
    </Tag>
  );
};

export { SplitChar };
export default SplitLine;
