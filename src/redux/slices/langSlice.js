// src/redux/slices/langSlice.js
import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "te", label: "తె", name: "Telugu" },
  { code: "hi", label: "हिं", name: "Hindi" },
];

const initialState = {
  current: "en",
  languages: LANGUAGES,
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const lang = action.payload;
      if (LANGUAGES.find((l) => l.code === lang)) {
        state.current = lang;
        i18n.changeLanguage(lang);
      }
    },
  },
});

export const { setLanguage } = langSlice.actions;
export const selectLang = (state) => state.lang.current;
export const selectLanguages = (state) => state.lang.languages;
export default langSlice.reducer;
