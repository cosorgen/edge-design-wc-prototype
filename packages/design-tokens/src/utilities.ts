import { tokens as SMTC } from './tokens.js';

export function camelCaseToKebabCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function themeToTokensObject(theme: Record<string, unknown>) {
  const tokens: Record<string, string> = {};
  const keys = Object.keys(theme);
  for (const key of keys) {
    if (Object.keys(SMTC).includes(key)) {
      tokens[key] = `var(--smtc-${camelCaseToKebabCase(key)})`;
    } else {
      tokens[key] = `var(--${camelCaseToKebabCase(key)})`;
    }
  }
  return tokens;
}
