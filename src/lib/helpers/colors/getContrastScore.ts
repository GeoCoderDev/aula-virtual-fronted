/**
 * Esta funcion recibe 2 colores hexagesimales como parametro y
 * te devuelve el puntaje del uno al 10 que tienen como contraste
 * @param {string} color1
 * @param {string} color2
 * @returns {number} score
 */
export function getContrastScore(color1: string, color2: string): number {
  // Convertir colores hexadecimales a valores RGB
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  // Calcular la luminancia relativa de cada color
  const luminance1 = getLuminance(rgb1);
  const luminance2 = getLuminance(rgb2);

  // Calcular el contraste
  const contrast =
    Math.max(luminance1, luminance2) / Math.min(luminance1, luminance2);

  // Calcular el puntaje de contraste en una escala del 1 al 10
  const contrastScore = Math.round((contrast + 0.05) / 0.05) * 0.5;
  return Math.max(1, Math.min(10, contrastScore));
}

// Función para convertir un color hexadecimal a valores RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

// Función para calcular la luminancia relativa de un color
function getLuminance({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}): number {
  const [r2, g2, b2] = [r / 255, g / 255, b / 255];
  const [r3, g3, b3] = [
    r2 <= 0.03928 ? r2 / 12.92 : Math.pow((r2 + 0.055) / 1.055, 2.4),
    g2 <= 0.03928 ? g2 / 12.92 : Math.pow((g2 + 0.055) / 1.055, 2.4),
    b2 <= 0.03928 ? b2 / 12.92 : Math.pow((b2 + 0.055) / 1.055, 2.4),
  ];
  return 0.2126 * r3 + 0.7152 * g3 + 0.0722 * b3;
}
