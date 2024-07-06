export function HHMMSSToHHMM(horaStr: string): string {
  // Verifica que la cadena tenga al menos 5 caracteres y esté en el formato correcto
  if (horaStr.length < 5 || !/^\d{2}:\d{2}/.test(horaStr)) {
    throw new Error(
      "El formato de la hora no es válido. Se esperaba HH:MM:SS."
    );
  }
  return horaStr.substring(0, 5);
}
