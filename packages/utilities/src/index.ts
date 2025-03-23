function camelCaseToKebabCase(str: string) {
  return str
    .replace(/[A-Z]/gm, (letter) => `-${letter.toLowerCase()}`)
    .replace(/([0-9])[0-9]*/gm, (number) => `-${number}`);
}

export function themeToTokensObject<T>(theme: T) {
  const tokens: Record<string, string> = {};
  const keys = Object.keys(theme as Record<string, unknown>);
  for (const key of keys) {
    tokens[key] = `var(--${camelCaseToKebabCase(key)})`;
  }
  return tokens;
}
