import { configureStore } from "@reduxjs/toolkit";
import settingsDataReducer from "./features/settingsSlice";
export const store = configureStore({
  reducer: {
    settingsData: settingsDataReducer,
  },
});
