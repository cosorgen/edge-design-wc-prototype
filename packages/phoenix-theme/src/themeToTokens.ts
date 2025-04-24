import { type Theme, lightTheme } from './themes.js';

export type Tokens = {
  [key in keyof Theme]: string;
};

function camelCaseToKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z0-9])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

export function themeToTokens(theme: Theme, prefix: string = 'smtc-'): Tokens {
  const tokens = {} as Tokens;
  for (const key of Object.keys(theme)) {
    tokens[key as keyof Theme] = `var(--${prefix}${camelCaseToKebabCase(key)})`;
  }

  return tokens;
}

export const tokens = themeToTokens(lightTheme());
