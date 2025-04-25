import React, { useCallback, useContext, useEffect } from 'react';
import { NavContext } from '../../contexts/nav';
import classNames from 'classnames';

const MenuBtn = () => {
  const [isOpen, setIsOpen] = useContext(NavContext);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  });

  return (
    <button
      className={classNames('menu-btn', { open: isOpen })}
      aria-label={`${isOpen ? 'close' : 'open'} navigation menu`}
      aria-controls="nav-menu"
      aria-expanded={isOpen + ''}
      onClick={handleClick}
    >
      <div>
        <i></i>
      </div>
      <div>
        <i></i>
      </div>
    </button>
  );
};

export default MenuBtn;
