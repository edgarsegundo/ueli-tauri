import { TranslationLanguage } from "../../translation-language"


export interface TranslationOptions {
    enabled: boolean;
    debounceDelay: number;
    minSearchTermLength: number;
    prefix: string;
    sourceLanguage: TranslationLanguage;
    targetLanguage: TranslationLanguage;
}

export const defaultTranslationOptions: TranslationOptions = {
    debounceDelay: 250,
    enabled: false,
    minSearchTermLength: 3,
    prefix: "t?",
    sourceLanguage: TranslationLanguage.German,
    targetLanguage: TranslationLanguage.English,
};
