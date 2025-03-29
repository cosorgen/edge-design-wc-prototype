import { tokens as kumoTokens } from './themeToTokens.js';

export function setThemeFor<Theme>(
  element: Document | ShadowRoot = document,
  theme: Theme,
) {
  const sheet = new CSSStyleSheet();
  const tokens = Object.keys(theme as Record<string, unknown>);
  let data = '';
  tokens.forEach((token) => {
    const cssVar = kumoTokens[token].replace(/var\(/, '').replace(/\)/, '');
    const varValue = theme[token as keyof Theme];
    data += `${cssVar}: ${varValue};`;
  });
  sheet.replaceSync(
    `:${element instanceof ShadowRoot ? 'host' : 'root'} {${data}}`,
  );
  element.adoptedStyleSheets.push(sheet);
}

export function setTheme<Theme>(theme: Theme) {
  setThemeFor(document, theme);
}
