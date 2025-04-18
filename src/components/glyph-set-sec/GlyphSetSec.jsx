import React from 'react';
import '@/styles/glyph-set-sec';
import GlyphSetSecContextProvider from '../../contexts/glyph-set-sec';
import Content from './Content';
import Header from './Header';

const GlyphSetSec = () => {
  return (
    <GlyphSetSecContextProvider>
      <section className="glyph-set-sec" id="glyph-set">
        <Header />
        <Content />
      </section>
    </GlyphSetSecContextProvider>
  );
};

export default GlyphSetSec;
