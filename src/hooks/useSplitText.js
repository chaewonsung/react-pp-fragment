import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const getLines = (ref) => {
  const range = document.createRange();
  const lines = [];
  const textNode = ref.current.childNodes[0];

  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return [];

  const words = textNode.textContent.split(' ');
  let currentIndex = 0;
  let previousTop = -100;
  let currentTop;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const start = currentIndex;
    const end = currentIndex + word.length;

    range.setStart(textNode, start);
    range.setEnd(textNode, end);

    currentTop = range.getBoundingClientRect().top;

    if (!lines.length || currentTop > previousTop + 1) {
      lines.push('');
    }

    const lastIndex = lines.length - 1;
    lines[lastIndex] += (lines[lastIndex] ? ' ' : '') + word;

    currentIndex = end + 1; // 다음 단어 인덱스 (공백 포함)
    previousTop = currentTop;
  }

  return lines;
};

const useSplitText = (ref, option = 'line') => {
  const [text, setText] = useState([]);

  useEffect(() => {
    if (option === 'char') {
      setText({ char: ref.current.textContent.split('') });
      return;
    }

    splitLines();
    window.addEventListener('resize', handleResize);
  }, []);

  const splitLines = useCallback(() => {
    const lines = getLines(ref);

    if (option === 'line') {
      setText(lines.map((line) => ({ line })));
    } else if (option === 'line, char') {
      setText(lines.map((line) => ({ line, char: line.split('') })));
    }
  }, []);

  const handleResize = useCallback(
    debounce(() => {
      flushSync(() => setText([]));
      splitLines();
    }, 500),
    []
  );

  const cleanup = useCallback(() => {
    setText([]);
    window.removeEventListener('resize', handleResize);
  }, []);

  return [text, cleanup];
};

export default useSplitText;
