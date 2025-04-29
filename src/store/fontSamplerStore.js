import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const initialState = {
  fontFamily: 'sans',
  fontSize: ~~(innerWidth * 0.1),
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: ~~(innerWidth * 0.1 * 1.3), // fontSize * 1.3
};

const useFontSamplerStore = create(
  subscribeWithSelector((set) => ({
    ...initialState,
    actions: {
      setFontFamily: (payload) =>
        set(() => ({
          fontFamily: payload,
        })),
      setFontSize: (payload) =>
        set(() => ({
          fontSize: payload,
          lineHeight: ~~(payload * 1.3),
        })),
      setFontWeight: (payload) =>
        set(() => ({
          fontWeight: payload,
        })),
      setLetterSpacing: (payload) =>
        set(() => ({
          letterSpacing: payload,
        })),
      setLineHeight: (payload) =>
        set(() => ({
          lineHeight: payload,
        })),
    },
  }))
);

export default useFontSamplerStore;
