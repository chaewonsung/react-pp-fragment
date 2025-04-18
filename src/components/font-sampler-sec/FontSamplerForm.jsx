import React, { useCallback, useContext, useRef, useState } from 'react';
import { FONT_FAMILY } from '../../data';
import PrimaryBtn from '../common/PrimaryBtn';
import { toCamelCase, toConstant } from '../../utils/changeNamingConvention';
import { SettingsContext } from '../../contexts/font-sampler-sec';

const FontSamplerForm = () => {
  return (
    <form className="font-sampler-sec__form">
      <div className="font-setting">
        <div className="label">Font</div>
        <div className="no-mobile">
          {FONT_FAMILY.map((ff) => (
            <RadioButton key={ff} label={ff} />
          ))}
        </div>
      </div>
      {RANGE_SETTING_DATA.map((props) => (
        <RangeSetting key={props.label} {...props} />
      ))}
    </form>
  );
};

const RadioButton = ({ label }) => {
  return (
    <>
      <input type="radio" name="fontFamily" id={label} />
      <PrimaryBtn as="label" htmlFor={label}>
        {label}
      </PrimaryBtn>
    </>
  );
};

const RANGE_SETTING_DATA = [
  {
    label: 'size',
    styleProp: 'font size',
    min: 10,
    unit: 'pt',
  },
  {
    label: 'weight',
    styleProp: 'font weight',
    min: 100,
    max: 900,
    unit: 'pt',
  },
  {
    label: 'letter spacing',
    styleProp: 'letter spacing',
    min: -10,
    max: 10,
    unit: '%',
  },
  {
    label: 'line height',
    styleProp: 'line height',
    unit: 'pt',
  },
];

const RangeSetting = ({ label, styleProp, min, max, unit }) => {
  const [settings, dispatch] = useContext(SettingsContext);

  const id = useRef(toCamelCase(label));
  const actionType = useRef(`SET_${toConstant(styleProp)}`);
  const camelStyleProp = useRef(toCamelCase(styleProp));
  const defaultValue = useRef(settings[camelStyleProp.current]);

  const handleChange = useCallback((e) => {
    dispatch({ type: actionType.current, payload: e.target.value });
  }, []);

  if (label === 'size') {
    max = defaultValue.current * 2;
  } else if (label === 'line height') {
    min = settings['fontSize'];
    max = min * 2;
  }

  return (
    <div key={label}>
      <label htmlFor={id.current}>{label}</label>
      <input
        type="range"
        id={id.current}
        min={min}
        max={max}
        value={settings[camelStyleProp.current]}
        onChange={handleChange}
      />
      <output htmlFor={id.current}>
        {settings[camelStyleProp.current]}
        {unit}
      </output>
    </div>
  );
};

export default FontSamplerForm;
