export function toCamelCase(snakeCase: string) {
  return snakeCase
    .toLowerCase() // "general_information"
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()); // "generalInformation"
}
