import { camelCaseToKebabCase } from '@mai-ui/utilities';

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
