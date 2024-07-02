import { getContrastScore } from "../colors/getContrastScore";

export function* gradientGenerator(
  creative: boolean = false,
  minContrastScore: number = 7
): Generator<
  { pattern: string; previousPatterns: string[] },
  { pattern: string; previousPatterns: string[] },
  { pattern: string; previousPatterns: string[] }
> {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#9966FF",
    "#4BC0C0",
    "#FF9F40",
    "#8C489F",
    "#2ECC71",
    "#E74C3C",
    "#8E44AD",
    "#3498DB",
    "#F1C40F",
    "#E67E22",
    "#9B59B6",
    "#1ABC9C",
    "#D35400",
    "#7F8C8D",
    "#C0392B",
    "#27AE60",
    "#2C3E50",
    "#F39C12",
    "#7D3C98",
    "#2980B9",
    "#EB9532",
    "#9C88FF",
    "#16A085",
    "#A93226",
    "#6C3483",
    "#34495E",
    "#FDCB6E",
    "#2E86C1",
    "#E55039",
    "#6C5CE7",
    "#D0D3D4",
    "#555273",
    "#A3CB38",
    "#7A94FF",
    "#52489C",
    "#FFA801",
    "#6F1E51",
    "#4CBB17",
    "#ED5565",
    "#45B39C",
    "#FC6E51",
    "#556270",
    "#B2904F",
    "#95A5A6",
    "#EC7063",
    "#82589F",
  ];

  // Función para ordenar aleatoriamente los colores
  const shuffleColors = () => {
    for (let i = colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
  };

  // Ordenar los colores aleatoriamente
  shuffleColors();

  const gradientTypes = [
    "linear-gradient(to right, {colors})",
    "linear-gradient(to left, {colors})",
    "linear-gradient(to top, {colors})",
    "linear-gradient(to bottom, {colors})",
    "linear-gradient({angle}deg, {colors})",
    "radial-gradient({colors})",
    "conic-gradient(from {angle}deg, {colors})",
    "repeating-linear-gradient(to right, {colors})",
    "repeating-radial-gradient({colors})",
  ];

  const creativePatterns = [
    "repeating-linear-gradient(45deg, {color1} 0px, {color1} 20px, {color2} 20px, {color2} 40px)", // Rayas diagonales
    "repeating-linear-gradient(135deg, {color1} 0px, {color1} 10px, transparent 10px, transparent 20px, {color2} 20px, {color2} 30px, transparent 30px, transparent 40px)", // Zigzag
    "linear-gradient(90deg, {color1}, {color1}), linear-gradient(90deg, {color2}, {color2})", // Barras verticales
    "linear-gradient(45deg, {color1} 25%, transparent 25%, transparent 75%, {color2} 75%, {color2}), linear-gradient(135deg, {color2} 25%, transparent 25%, transparent 75%, {color1} 75%, {color1})", // Cuadrados diagonales
    "radial-gradient(circle at 50% 50%, {color1}, {color2})", // Degradado radial
    "conic-gradient(from 90deg at 50% 50%, {color1}, {color2}, {color1})", // Degradado cónico
    "repeating-conic-gradient(from 0deg at 50% 50%, {color1} 0% 25%, {color2} 0% 50%)", // Degradado cónico repetido
    "repeating-radial-gradient(circle at 50% 50%, {color1} 0px, {color1} 10px, {color2} 10px, {color2} 20px)", // Anillos concéntricos
    "repeating-linear-gradient(45deg, {color1} 0px, {color1} 10px, {color2} 10px, {color2} 20px)", // Triángulos diagonales
    "repeating-linear-gradient(135deg, {color1} 0px, {color1} 20px, {color2} 20px, {color2} 40px, {color1} 40px, {color1} 60px)", // Patrón de diamantes
    "repeating-linear-gradient(45deg, {color1} 0px, {color1} 10px, transparent 10px, transparent 20px), repeating-linear-gradient(-45deg, {color2} 0px, {color2} 10px, transparent 10px, transparent 20px)", // Cuadrícula diagonal
    "repeating-conic-gradient(from 0deg, {color1} 0% 25%, {color2} 0% 50%), repeating-conic-gradient(from 180deg, {color1} 0% 25%, {color2} 0% 50%)", // Patrón de espiral
    "conic-gradient(from 90deg at 50% 50%, {color1} 0deg, {color1} 90deg, {color2} 90deg, {color2} 180deg, {color1} 180deg, {color1} 270deg, {color2} 270deg, {color2} 360deg)", // Patrón de cuartos
  ];

  const allPatterns: string[] = []; // Arreglo para almacenar todos los patrones generados

  while (true) {
    let color1, color2;
    let contrastScore;

    do {
      color1 = colors[Math.floor(Math.random() * colors.length)];
      color2 = colors[Math.floor(Math.random() * colors.length)];
      contrastScore = getContrastScore(color1, color2);
    } while (contrastScore < minContrastScore);

    let pattern;

    if (creative) {
      pattern =
        creativePatterns[Math.floor(Math.random() * creativePatterns.length)];
      pattern = pattern
        .replace(/{color1}/g, color1)
        .replace(/{color2}/g, color2);
    } else {
      let gradientType =
        gradientTypes[Math.floor(Math.random() * gradientTypes.length)];
      const angle = Math.floor(Math.random() * 360);

      if (gradientType.includes("{colors}")) {
        gradientType = gradientType.replace("{colors}", `${color1}, ${color2}`);
      }

      if (gradientType.includes("{angle}")) {
        gradientType = gradientType.replace("{angle}", angle.toString());
      }

      pattern = gradientType;
    }

    allPatterns.push(pattern); // Agregar el patrón actual al arreglo

    yield { pattern, previousPatterns: [...allPatterns] }; // Devolver el patrón actual y una copia del arreglo
  }
}
