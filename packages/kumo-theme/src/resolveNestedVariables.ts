import { Theme } from './themes.js';

export function resolveNestedVariables(theme: Theme): Theme {
  for (const key of Object.keys(theme)) {
    let value = theme[key as keyof Theme];
    const regex = /\{(.+?)\}/; // {variableKey}
    let match = value.match(regex);
    while (match) {
      const [wholeMatch, newKey] = match;
      if (theme[newKey as keyof Theme]) {
        value = value.replace(wholeMatch, theme[newKey as keyof Theme]);
        match = value.match(regex);
      } else {
        console.error('Theme missing key:', newKey);
        match = null; // break the loop
      }
    }

    theme[key as keyof Theme] = value;
  }

  return theme;
}
