// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import langReducer from "./slices/langSlice";
import supportReducer from "./slices/supportSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    lang: langReducer,
    support: supportReducer,
  },
});

export default store;
