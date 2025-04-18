import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

function MyPage() {
  return (
    <ThemeProvider>
      <Form />
      <Button>Switch to light theme</Button>
      <Button2></Button2>
    </ThemeProvider>
  );
}

const Form = () => {
  return <form action="">폼입니당</form>;
};

const Button = ({ children }) => {
  const { setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
    >
      {children}
    </button>
  );
};

const Button2 = () => {
  return <button>렌더링되면 안돼요</button>;
};

export default MyPage;
