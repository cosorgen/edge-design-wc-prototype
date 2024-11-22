import { copilotBorderRadius } from './borderRadius.js';
import { copilotLightThemeColors } from './colors.js';
import { copilotCurveTokens, copilotDurationTokens } from './motion.js';
import { copilotSpacingTokens } from './spacingTokens.js';
import { copilotTypographyTokens } from './typography.js';

function camelCaseToKebabCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

const copilotTokens = [
  ...Object.keys(copilotBorderRadius),
  ...Object.keys(copilotLightThemeColors),
  ...Object.keys(copilotDurationTokens),
  ...Object.keys(copilotCurveTokens),
  ...Object.keys(copilotSpacingTokens),
  ...Object.keys(copilotTypographyTokens),
];

export function setThemeFor(
  element: Document | ShadowRoot = document,
  theme: Record<string, unknown>,
) {
  const sheet = new CSSStyleSheet();
  const tokenNames = Object.keys(theme);
  let data = '';
  tokenNames.forEach((name) => {
    if (copilotTokens.includes(name)) {
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
