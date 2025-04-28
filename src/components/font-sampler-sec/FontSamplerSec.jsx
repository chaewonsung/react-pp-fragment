import React, { useContext } from 'react';
import '@/styles/font-sampler-sec';
import FontSamplerForm from './FontSamplerForm';
import FontSamplerSecContextProvider, {
  SettingsContext,
} from '../../contexts/font-sampler-sec';

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
  const [settings] = useContext(SettingsContext);

  const style = {
    fontFamily: `var(--font-${settings.fontFamily})`,
    fontSize: settings.fontSize + 'px',
    fontWeight: settings.fontWeight,
    letterSpacing: settings.letterSpacing + 'px',
    lineHeight: settings.lineHeight + 'px',
    height: settings.lineHeight * 3 + 'px',
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
