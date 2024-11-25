import { camelCaseToKebabCase } from '@mai-ui/utilities';

export function themeToTokensObject<T>(theme: T) {
  const tokens: Record<string, string> = {};
  const keys = Object.keys(theme as Record<string, unknown>);
  for (const key of keys) {
    tokens[key] = `var(--${camelCaseToKebabCase(key)})`;
  }
  return tokens;
}
