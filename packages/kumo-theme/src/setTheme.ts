import { kumoBorderRadius } from './borderRadius.js';
import { kumoLightThemeColors } from './colors.js';
import { kumoCurveTokens, kumoDurationTokens } from './motion.js';
import { kumoSpacingTokens } from './spacingTokens.js';
import { kumoTypographyTokens } from './typography.js';

function camelCaseToKebabCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

const kumoTokens = [
  ...Object.keys(kumoBorderRadius),
  ...Object.keys(kumoLightThemeColors),
  ...Object.keys(kumoDurationTokens),
  ...Object.keys(kumoCurveTokens),
  ...Object.keys(kumoSpacingTokens),
  ...Object.keys(kumoTypographyTokens),
];

export function setThemeFor(
  element: Document | ShadowRoot = document,
  theme: Record<string, unknown>,
) {
  const sheet = new CSSStyleSheet();
  const tokenNames = Object.keys(theme);
  let data = '';
  tokenNames.forEach((name) => {
    if (kumoTokens.includes(name)) {
      data += `--smtc-${camelCaseToKebabCase(name)}: ${theme[name]};`;
    } else {
      data += `--${name}: ${theme[name]};`;
    }
  });
  sheet.replaceSync(
    `:${element instanceof ShadowRoot ? 'host' : 'root'} {${data}}`,
  );
  element.adoptedStyleSheets.push(sheet);
}
