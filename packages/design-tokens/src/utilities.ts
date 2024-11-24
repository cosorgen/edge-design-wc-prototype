import { tokens as SMTC } from './tokens.js';
import { camelCaseToKebabCase } from '@mai-ui/utilities';

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
