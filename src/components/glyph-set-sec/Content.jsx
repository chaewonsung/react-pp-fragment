import React, { memo, useCallback, useContext } from 'react';
import {
  FontSettingContext,
  GlyphContext,
  SetGlyphContext,
} from '../../contexts/glyph-set-sec';
import { GLYPH_SET } from '../../data';

const Content = () => {
  const { ff, fw } = useContext(FontSettingContext);

  return (
    <div
      className="glyph-set-sec__content"
      style={{
        fontFamily: `var(--font-${ff})`,
        fontWeight: fw,
      }}
    >
      <div className="glyph-set-sec__glyph-set">
        <p>
          Pangram Pangram® Foundry offers you an elegant & retro contemporary
          new font — Fragment
        </p>
        <GlyphSet />
      </div>
      <div className="glyph-set-sec__result">
        <SelectedGlyph />
      </div>
    </div>
  );
};

const GlyphSet = memo(() => {
  const setGlyph = useContext(SetGlyphContext);

  const handleSelectGlyph = useCallback(({ target }) => {
    if (!target.matches('li')) return;
    setGlyph(target.textContent);
  }, []);

  return (
    <ul className="glyph-set" onMouseOver={handleSelectGlyph}>
      {GLYPH_SET.map((glyph) => (
        <li key={glyph}>
          <i>{glyph}</i>
        </li>
      ))}
    </ul>
  );
});

GlyphSet.displayName = 'GlyphSet';

const SelectedGlyph = () => {
  const glyph = useContext(GlyphContext);

  return <i>{glyph}</i>;
};

export default Content;
