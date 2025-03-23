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

export function setThemeFor<Theme>(
  element: Document | ShadowRoot = document,
  theme: Theme,
) {
  const sheet = new CSSStyleSheet();
  const tokens = Object.keys(theme as Record<string, unknown>);
  let data = '';
  tokens.forEach((name) => {
    data += `--${camelCaseToKebabCase(name)}: ${String(theme[name as keyof Theme])};`;
  });
  sheet.replaceSync(
    `:${element instanceof ShadowRoot ? 'host' : 'root'} {${data}}`,
  );
  element.adoptedStyleSheets.push(sheet);
}

export function setTheme<Theme>(theme: Theme) {
  setThemeFor(document, theme);
}
