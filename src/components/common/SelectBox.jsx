import classNames from 'classnames';
import PropTypes, { checkPropTypes } from 'prop-types';
import React, { memo, useCallback, useEffect, useState } from 'react';

const SelectBox = ({ defaultOption, options, handleSelect }) => {
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0]?.option || options[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    checkPropTypes(
      SelectBox.propTypes,
      { defaultOption, options, handleSelect },
      'prop',
      SelectBox.name
    );
  }, []);

  return (
    <div
      className={classNames('select-box', { open: isOpen })}
      onClick={handleToggle}
    >
      <button>
        <span className="select-box__selected-option">{selectedOption}</span>
        <span className="arrow">↓</span>
      </button>
      <Options
        setSelectedOption={setSelectedOption}
        handleSelect={handleSelect}
        options={options}
      />
    </div>
  );
};

const Options = memo(({ setSelectedOption, handleSelect, options }) => {
  const handleClick = useCallback(({ target }) => {
    if (!target.matches('button')) return;

    setSelectedOption(target.textContent);
    handleSelect && handleSelect(target);
  }, []);

  return (
    <ul onClick={handleClick}>
      {options.map((opt) => (
        <li key={opt?.option || opt}>
          <button {...opt?.props}>
            {typeof opt === 'string' ? opt : opt.option}
          </button>
        </li>
      ))}
    </ul>
  );
});

Options.displayName = 'Options';

SelectBox.propTypes = {
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.exact({
        option: PropTypes.string,
        props: PropTypes.object,
      })
    ),
  ]).isRequired,
  handleSelect: PropTypes.func,
};

export default SelectBox;
