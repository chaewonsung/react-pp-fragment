import React, { useState } from 'react';
import { createContext } from 'react';

const NavContext = createContext([]);

const NavContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </NavContext.Provider>
  );
};

export { NavContext };
export default NavContextProvider;
