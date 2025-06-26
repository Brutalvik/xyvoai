// src/languageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  selected: "en" | "fr";
}

const initialState: LanguageState = {
  selected: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "fr">) => {
      state.selected = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
