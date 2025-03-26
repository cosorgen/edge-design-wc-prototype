export function resolveNestedVariables(
  theme: Record<string, string>,
): Record<string, string> {
  let exitLoop = true;
  do {
    exitLoop = true; // will set to false if we find variables to ressolve
    let error = false; // Need error to never be reset in the for loop
    for (const key of Object.keys(theme)) {
      const matches = theme[key].matchAll(/{(.+?)}/gm);
      for (const match of matches) {
        exitLoop = false; // We found variables
        const newKey = match[1];
        const oldValue = theme[key];
        const newValue =
          oldValue.substring(0, match.index) +
          theme[newKey] +
          oldValue.substring(match.index + match[0].length);
        if (key === 'shadowFlyout') {
          console.log(newKey, '\n', newValue, '\n\n');
        }
        if (newValue) {
          theme[key] = newValue || oldValue;
        } else {
          console.error('Missing key in theme:', key, '=', newKey);
          error = true;
        }
      }
    }
    if (error) exitLoop = true; // We will always find variables if there was an error
  } while (!exitLoop);

  return theme;
}
