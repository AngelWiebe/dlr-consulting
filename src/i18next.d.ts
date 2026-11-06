import type en from './locales/en/translation.json'

// Empty JSON arrays are typed as `never[]`. i18next walks resource keys
// recursively, and those arrays make `useTranslation()` exceed TypeScript's
// instantiation limit (TS2589).
type TranslationResources<T> = T extends readonly (infer U)[]
  ? [U] extends [never]
    ? string[]
    : TranslationResources<U>[]
  : T extends object
    ? { [K in keyof T]: TranslationResources<T[K]> }
    : T

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: TranslationResources<typeof en>
    }
  }
}
