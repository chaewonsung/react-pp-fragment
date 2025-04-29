import classNames from 'classnames';
import PropTypes, { checkPropTypes } from 'prop-types';
import React, { memo, useCallback, useEffect, useState } from 'react';

const SelectBox = ({
  defaultOption,
  options,
  handleSelect,
  label,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0]?.option || options[0]
  );
  const [isOpen, setIsOpen] = useState(false);

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
      {...props}
      className={classNames(props.className, 'select-box', { open: isOpen })}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-expanded={isOpen}
      >
        <span className="select-box__selected-option">{selectedOption}</span>
        <span className="arrow" aria-hidden>
          ↓
        </span>
      </button>
      <Options
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleSelect={handleSelect}
        options={options}
      />
    </div>
  );
};

const Options = memo(
  ({ selectedOption, setSelectedOption, handleSelect, options }) => {
    const handleClick = useCallback(({ target }) => {
      if (!target.matches('button')) return;

      setSelectedOption(target.textContent);
      handleSelect && handleSelect(target);
    }, []);

    return (
      <ul onClick={handleClick} role="listbox">
        {options.map((option) => {
          const opt = option?.option || option;
          return (
            <li key={opt}>
              <button
                {...option?.props}
                type="button"
                role="option"
                aria-selected={selectedOption === opt}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
);

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
