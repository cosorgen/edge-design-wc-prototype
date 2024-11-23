import { tokens as SMTC } from './tokens.js';

export function camelCaseToKebabCase(str: string) {
  return str
    .replace(/[A-Z]/gm, (letter) => `-${letter.toLowerCase()}`)
    .replace(/([0-9])[0-9]*/gm, (number) => `-${number}`);
}

export function themeToTokensObject<T>(theme: T) {
  const tokens: Record<string, string> = {};
  const keys = Object.keys(theme as Record<string, unknown>);
  for (const key of keys) {
    if (Object.keys(SMTC).includes(key)) {
      tokens[key] = (SMTC as Record<string, string>)[key];
    } else {
      tokens[key] = `var(--${camelCaseToKebabCase(key)})`;
    }
  }
  return tokens;
}
