import { createContext, useState } from 'react';
import React from 'react';

const GlyphContext = createContext('!');
const SetGlyphContext = createContext(() => {});

const FontSettingContext = createContext({ ff: 'sans', fw: 200 });
const setFontSettingContext = createContext(() => {});

const GlyphSetSecContextProvider = ({ children }) => {
  const [glyph, setGlyph] = useState('!');
  const [fontSetting, setFontSetting] = useState({ ff: 'sans', fw: 200 });

  return (
    <FontSettingProvider value={fontSetting}>
      <SetFontSettingProvider value={setFontSetting}>
        <GlyphProvider value={glyph}>
          <SetGlyphProvider value={setGlyph}>{children}</SetGlyphProvider>
        </GlyphProvider>
      </SetFontSettingProvider>
    </FontSettingProvider>
  );
};

const GlyphProvider = ({ value, children }) => (
  <GlyphContext.Provider value={value}>{children}</GlyphContext.Provider>
);

const SetGlyphProvider = ({ value, children }) => (
  <SetGlyphContext.Provider value={value}>{children}</SetGlyphContext.Provider>
);

const FontSettingProvider = ({ value, children }) => (
  <FontSettingContext.Provider value={value}>
    {children}
  </FontSettingContext.Provider>
);

const SetFontSettingProvider = ({ value, children }) => (
  <setFontSettingContext.Provider value={value}>
    {children}
  </setFontSettingContext.Provider>
);

export {
  GlyphContext,
  SetGlyphContext,
  FontSettingContext,
  setFontSettingContext,
};
export default GlyphSetSecContextProvider;
