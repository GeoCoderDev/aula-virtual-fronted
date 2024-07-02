/**
 * Convierte una cadena separada por comas en un Set.
 * @param {string} str - La cadena a convertir en Set.
 * @returns {Set} Un Set que contiene los elementos de la cadena.
 */
export function commaSeparatedStringToSet(str: string): Set<number> {
  if (!str) return new Set();
  return new Set(str.split(",").map((val) => Number(val)));
}
