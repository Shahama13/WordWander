/// <reference types="vite/client" />
type langCodes = {
  name: string;
  code: string;
};
type langType = "ja" | "es" | "ar" | "hi" | "fr";
type WordType = {
  word: string;
  meaning: string;
  options: string[];
};
interface StateType {
  loading: boolean;
  result: string[];
  error?: string;
  words: WordType[];
}
type TranslationType = {
  translations: {
    text: string;
  }[];
};
