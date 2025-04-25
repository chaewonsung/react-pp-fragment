import React, { useCallback, useContext, useRef, useState } from 'react';
import { FONT_FAMILY } from '../../data';
import PrimaryBtn from '../common/PrimaryBtn';
import { initialState, SettingsContext } from '../../contexts/font-sampler-sec';
import SelectBox from '../common/SelectBox';

const RANGE_SETTING_DATA = {
  size: {
    legend: 'size',
    styleProp: 'fontSize',
    actionType: 'FONT_SIZE',
    min: 10,
    max: initialState.fontSize * 2,
    unit: 'pt',
  },
  weight: {
    legend: 'weight',
    styleProp: 'fontWeight',
    actionType: 'FONT_WEIGHT',
    min: 100,
    max: 900,
    unit: 'pt',
  },
  letterSpacing: {
    legend: 'letter spacing',
    styleProp: 'letterSpacing',
    actionType: 'LETTER_SPACING',
    min: -10,
    max: 10,
    unit: '%',
  },
  lineHeight: {
    legend: 'line height',
    styleProp: 'lineHeight',
    actionType: 'LINE_HEIGHT',
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
  const [settings, dispatch] = useContext(SettingsContext);

  const handleChange = useCallback((e) => {
    dispatch({ type: 'SET_FONT_FAMILY', payload: e.target.value });
  }, []);

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
              checked={settings.fontFamily === ff}
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
  const [_, dispatch] = useContext(SettingsContext);
  const handleSelect = useCallback((target) => {
    dispatch({ type: 'SET_FONT_FAMILY', payload: target.textContent });
  }, []);
  return <SelectBox options={[...FONT_FAMILY]} handleSelect={handleSelect} />;
};

const SizeSetting = () => {
  return <RangeSetting {...RANGE_SETTING_DATA.size} />;
};

const WeightSetting = () => {
  return <RangeSetting {...RANGE_SETTING_DATA.weight} />;
};

const LetterSpacingSetting = () => {
  return <RangeSetting {...RANGE_SETTING_DATA.letterSpacing} />;
};

const LineHeightSetting = () => {
  const [settings] = useContext(SettingsContext);
  const min = settings.fontSize;
  const max = min * 2;
  return (
    <RangeSetting {...RANGE_SETTING_DATA.lineHeight} min={min} max={max} />
  );
};

const RangeSetting = ({ legend, styleProp, actionType, min, max, unit }) => {
  const [settings, dispatch] = useContext(SettingsContext);

  const id = legend.split(' ').join('-');
  const value = settings[styleProp];

  const handleChange = useCallback((e) => {
    dispatch({ type: `SET_${actionType}`, payload: e.target.value });
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
