import React from 'react';
import '@/styles/nav';
import MenuBtn from '../common/MenuBtn';
import Link from '../common/Link';

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__controller">
        <h2>Table of Contents</h2>
        <MenuBtn />
      </div>
      <div className="nav__content" id="nav-menu" aria-hidden="true">
        <div className="lnb">
          <div className="lnb__typo split-char split-char">Fragment</div>
          <ul className="lnb__list">
            {[
              'introduction',
              'from sans to serif',
              'glyph set',
              'font sampler',
              'fragment in use',
              'special characters',
            ].map((v) => (
              <li key={v}>
                <a href={`#${v.split().join('-')}`} className="line-wrapper">
                  <span className="line">{v}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="/" className="lnb__get-font split-char split-char">
            Get 〖the font〗
          </a>
        </div>
        <div className="gnb">
          <div className="gnb__top">
            <div>
              <Link>Pangram Pangram® Foundry</Link>
            </div>
            <div>
              <Link>Locomotive</Link>
            </div>
          </div>
          <div className="gnb__bottom">
            <Link>Terms & Conditions</Link>
            <Link>FAQ</Link>
            <Link>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
