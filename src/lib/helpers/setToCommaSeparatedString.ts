/**
 * Convierte un Set a una cadena separada por comas.
 * @param {Set} set - El Set que se convertirá a cadena.
 * @returns {string} Una cadena que contiene los elementos del Set separados por comas.
 */
export function setToCommaSeparatedString(set: Set<any>): string {
  return Array.from(set).join(",");
}
