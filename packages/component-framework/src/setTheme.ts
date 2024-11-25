import { camelCaseToKebabCase } from '@mai-ui/utilities';
import { tokens as semanticTokens } from '@mai-ui/design-tokens/tokens.js';

export function setThemeFor<Theme>(
  element: Document | ShadowRoot = document,
  theme: Theme,
) {
  const sheet = new CSSStyleSheet();
  const tokens = Object.keys(theme as Record<string, unknown>);
  let data = '';
  tokens.forEach((name) => {
    if (name in semanticTokens) {
      data += `--smtc-${camelCaseToKebabCase(name)}: ${String(theme[name as keyof Theme])};`;
    } else {
      data += `--${camelCaseToKebabCase(name)}: ${String(theme[name as keyof Theme])};`;
    }
  });
  sheet.replaceSync(
    `:${element instanceof ShadowRoot ? 'host' : 'root'} {${data}}`,
  );
  element.adoptedStyleSheets.push(sheet);
}

export function setTheme<Theme>(theme: Theme) {
  setThemeFor(document, theme);
}
