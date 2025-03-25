export function resolveDependencies(
  theme: Record<string, string>,
): Record<string, string> {
  const newTheme = { ...theme };
  let exitLoop = true; // will set to false if we find variables to ressolve
  let passCount = 1;
  do {
    console.log('Ressolving pass', passCount);
    passCount++;

    let error = false;
    for (const [key, value] of Object.entries(theme)) {
      const matches = value.matchAll(/{(.+?)}/gm);
      for (const match of matches) {
        exitLoop = false; // We found variables
        const newKey = match[1];
        const newValue = theme[newKey];
        if (newValue) {
          newTheme[key] = theme[newKey] || value;
        } else {
          console.error('Missing key in theme:', key, '=', newKey);
          error = true;
        }
      }
    }
    if (error) exitLoop = true; // We will always find variables if there was an error
  } while (!exitLoop);

  return newTheme;
}
