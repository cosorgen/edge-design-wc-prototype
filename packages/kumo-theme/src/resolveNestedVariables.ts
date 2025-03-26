export function resolveNestedVariables(
  theme: Record<string, string>,
): Record<string, string> {
  for (const key of Object.keys(theme)) {
    let value = theme[key];
    const regex = /\{(.+?)\}/; // {variableKey}
    let match = value.match(regex);
    while (match) {
      const [wholeMatch, newKey] = match;
      if (theme[newKey]) {
        value = value.replace(wholeMatch, theme[newKey]);
        match = value.match(regex);
      } else {
        console.error('Theme missing key:', newKey);
      }
    }

    theme[key] = value;
  }

  return theme;
}
