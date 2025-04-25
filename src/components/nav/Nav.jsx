import React, { useContext, useEffect, useRef } from 'react';
import '@/styles/nav';
import MenuBtn from '../common/MenuBtn';
import { NavContext } from '../../contexts/nav';
import NavContent from './NavContent';
import classNames from 'classnames';

const Nav = () => {
  const [isOpen, setIsOpen] = useContext(NavContext);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickDoc = (e) => {
      if (navRef.current.contains(e.target)) return;
      setIsOpen(false);
    };

    document.addEventListener('click', handleClickDoc);

    return () => {
      document.removeEventListener('click', handleClickDoc);
    };
  }, []);

  return (
    <nav className={classNames('nav', { open: isOpen })} ref={navRef}>
      <div className="nav__controller">
        <h2>Table of Contents</h2>
        <MenuBtn />
      </div>
      <NavContent />
    </nav>
  );
};

export default Nav;
