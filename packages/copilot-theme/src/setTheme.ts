import { tokens } from './tokens.js';

export function setThemeFor<Theme>(
  element: Document | ShadowRoot = document,
  theme: Theme,
) {
  const sheet = new CSSStyleSheet();
  const tokenNames = Object.keys(theme as Record<string, unknown>);
  let data = '';
  tokenNames.forEach((name) => {
    data +=
      tokens[name].replace('var(', '').replace(')', '') +
      ':' +
      theme[name as keyof Theme] +
      ';';
  });
  sheet.replaceSync(
    `:${element instanceof ShadowRoot ? 'host' : 'root'} {${data}}`,
  );
  element.adoptedStyleSheets.push(sheet);
}
