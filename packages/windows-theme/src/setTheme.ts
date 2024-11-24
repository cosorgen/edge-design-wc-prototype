export function setThemeFor<Theme>(
  element: Document | ShadowRoot = document,
  theme: Theme,
) {
  const sheet = new CSSStyleSheet();
  const tokens = Object.entries(theme as Record<string, string>);
  let data = '';
  tokens.forEach(([name, value]) => {
    data +=
      value.replace('var(', '').replace(')', '') +
      ':' +
      theme[name as keyof Theme] +
      ';';
  });
  sheet.replaceSync(
    `:${element instanceof ShadowRoot ? 'host' : 'root'} {${data}}`,
  );
  element.adoptedStyleSheets.push(sheet);
}

export function setTheme<Theme>(theme: Theme) {
  setThemeFor(document, theme);
}
