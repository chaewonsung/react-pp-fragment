import React, { useCallback, useEffect, useState } from 'react';
import { FONT_FAMILY } from '../../data';
import PrimaryBtn from '../common/PrimaryBtn';
import SelectBox from '../common/SelectBox';
import { debounce } from 'lodash';
import useFontSamplerStore from '../../store/fontSamplerStore';
import { useShallow } from 'zustand/shallow';

const RANGE_SETTING_DATA = {
  size: {
    legend: 'size',
    styleProp: 'fontSize',
    min: 10,
    unit: 'pt',
  },
  weight: {
    legend: 'weight',
    styleProp: 'fontWeight',
    min: 100,
    max: 900,
    unit: 'pt',
  },
  letterSpacing: {
    legend: 'letter spacing',
    styleProp: 'letterSpacing',
    min: -10,
    max: 10,
    unit: '%',
  },
  lineHeight: {
    legend: 'line height',
    styleProp: 'lineHeight',
    unit: 'pt',
  },
};

const FontSamplerForm = () => {
  return (
    <form className="font-sampler-sec__form">
      <FontSetting />
      <SizeSetting />
      <WeightSetting />
      <LetterSpacingSetting />
      <LineHeightSetting />
    </form>
  );
};

const FontSetting = () => {
  const [fontFamily, setFontFamily] = useFontSamplerStore(
    useShallow((state) => [state.fontFamily, state.actions.setFontFamily])
  );

  const handleChange = useCallback((e) => setFontFamily(e.target.value), []);

  return (
    <fieldset className="font-setting">
      <legend>Font</legend>
      <div className="radios">
        {FONT_FAMILY.map((ff) => (
          <React.Fragment key={ff}>
            <input
              type="radio"
              id={ff}
              name="font"
              value={ff}
              checked={fontFamily === ff}
              onChange={handleChange}
            />
            <PrimaryBtn as="label" htmlFor={ff}>
              {ff}
            </PrimaryBtn>
          </React.Fragment>
        ))}
      </div>
      <FontSelectBox />
    </fieldset>
  );
};

const FontSelectBox = () => {
  const { setFontFamily } = useFontSamplerStore((state) => state.actions);

  const handleSelect = useCallback(
    (target) => setFontFamily(target.textContent),
    []
  );
  return (
    <SelectBox
      options={[...FONT_FAMILY]}
      handleSelect={handleSelect}
      label="select font family"
    />
  );
};

const SizeSetting = () => {
  const { setFontSize } = useFontSamplerStore((state) => state.actions);
  const [max, setMax] = useState(~~(innerWidth * 0.1) * 2);

  useEffect(() => {
    const handleResize = debounce(() => {
      const newFontSize = ~~(innerWidth * 0.1);
      setFontSize(newFontSize);
      setMax(newFontSize * 2);
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <RangeSetting {...RANGE_SETTING_DATA.size} max={max} />;
};

const WeightSetting = () => {
  return <RangeSetting {...RANGE_SETTING_DATA.weight} />;
};

const LetterSpacingSetting = () => {
  return <RangeSetting {...RANGE_SETTING_DATA.letterSpacing} />;
};

const LineHeightSetting = () => {
  const [minMax, setMinMax] = useState({
    min: ~~(innerWidth * 0.1),
    max: ~~(innerWidth * 0.1) * 2,
  });

  useEffect(() => {
    useFontSamplerStore.subscribe(
      (state) => state.fontSize,
      (fontSize) => setMinMax({ min: fontSize, max: fontSize * 2 })
    );
  }, []);
  return (
    <RangeSetting
      {...RANGE_SETTING_DATA.lineHeight}
      min={minMax.min}
      max={minMax.max}
    />
  );
};

const RangeSetting = ({ legend, styleProp, min, max, unit }) => {
  const action = styleProp.charAt(0).toUpperCase() + styleProp.slice(1);
  const [value, setValue] = useFontSamplerStore(
    useShallow((state) => [state[styleProp], state.actions[`set${action}`]])
  );

  const id = legend.split(' ').join('-');

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <fieldset>
      <legend>{legend}</legend>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <output htmlFor={id}>{`${value}${unit}`}</output>
    </fieldset>
  );
};

export default FontSamplerForm;
