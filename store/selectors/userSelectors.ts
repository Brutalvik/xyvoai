import { RootState } from "@/store";

export const selectLanguage = (state: RootState) => state.language.selected;
export const isEnglish = (state: RootState) => state.language.selected === "en";
export const isFrench = (state: RootState) => state.language.selected === "fr";
