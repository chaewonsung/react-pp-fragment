import React, { useEffect } from 'react';
import PrimaryBtn from '../common/PrimaryBtn';
import '@/styles/header';
import Link from '../common/Link';
import MenuBtn from '../common/MenuBtn';

const Header = () => {
  
  return (
    <header className="header">
      <h1>
        <Link>PP® Fragment</Link>
      </h1>
      <div>
        <Link>Pangram Pangram® Foundry</Link> + <Link>Locomotive®</Link>
      </div>
      <PrimaryBtn white>get the font</PrimaryBtn>
      <MenuBtn />
    </header>
  );
};

export default Header;
