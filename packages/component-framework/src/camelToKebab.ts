export function camelCaseToKebabCase(str: string) {
  return str
    .replace(/[A-Z]/gm, (letter) => `-${letter.toLowerCase()}`)
    .replace(/([0-9])[0-9]*/gm, (number) => `-${number}`);
}
