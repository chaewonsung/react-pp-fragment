import React, { createContext, useReducer } from 'react';

const initialState = {
  fontFamily: 'sans',
  fontSize: ~~(innerWidth * 0.1),
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: ~~(innerWidth * 0.1 * 1.3), // fontSize * 1.3
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FONT_FAMILY':
      return { ...state, fontFamily: action.payload };
    case 'SET_FONT_SIZE':
      return {
        ...state,
        fontSize: action.payload,
        lineHeight: ~~(action.payload * 1.3),
      };
    case 'SET_FONT_WEIGHT':
      return { ...state, fontWeight: action.payload };
    case 'SET_LETTER_SPACING':
      return { ...state, letterSpacing: action.payload };
    case 'SET_LINE_HEIGHT':
      return { ...state, lineHeight: action.payload };
    default:
      return state;
  }
}

const SettingsContext = createContext({});

const FontSamplerSecContextProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(reducer, initialState);

  const value = [settings, dispatch];

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, initialState };
export default FontSamplerSecContextProvider;
