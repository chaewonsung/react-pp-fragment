import React, { useContext } from 'react';
import '@/styles/font-sampler-sec';
import FontSamplerForm from './FontSamplerForm';
import FontSamplerSecContextProvider from '../../contexts/font-sampler-sec';
import useFontSamplerStore from '../../store/fontSamplerStore';
import { useShallow } from 'zustand/shallow';

const FontSamplerSec = () => {
  return (
    <FontSamplerSecContextProvider>
      <section className="font-sampler-sec" id="font-sampler">
        <FontSamplerForm />
        <Textarea />
      </section>
    </FontSamplerSecContextProvider>
  );
};

const Textarea = () => {
  const [fontFamily, fontSize, fontWeight, letterSpacing, lineHeight] =
    useFontSamplerStore(
      useShallow((state) => [
        state.fontFamily,
        state.fontSize,
        state.fontWeight,
        state.letterSpacing,
        state.lineHeight,
      ])
    );

  const style = {
    fontFamily: `var(--font-${fontFamily})`,
    fontSize: fontSize + 'px',
    fontWeight: fontWeight,
    letterSpacing: letterSpacing + 'px',
    lineHeight: lineHeight + 'px',
    height: lineHeight * 3 + 'px',
  };

  return (
    <div className="font-sampler-sec__result">
      <textarea
        style={style}
        defaultValue="Sphinx of Black Quartz, Judge My Vow"
      />
    </div>
  );
};

export default FontSamplerSec;
