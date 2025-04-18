import React from 'react';

const RangeSetting = ({
  id,
  label,
  name,
  min,
  max,
  unit,
  styleunit,
  defaultValue,
}) => {
  return (
    <div key={id} className={`${label}-setting`}>
      <label htmlFor={label}>{label}</label>
      <input
        type="range"
        name={name}
        id={label}
        min={min}
        max={max}
        data-style-unit={styleunit}
        defaultValue={defaultValue}
      />
      <output htmlFor={label} data-unit={unit}></output>
    </div>
  );
};

export default RangeSetting;
