export function equalObjects(objetoA: any, objetoB: any): boolean {
  
  if (objetoA === objetoB) return true;
  if (!objetoA || !objetoB) return false;

  // Obtener las claves de cada objeto
  const clavesA = Object.keys(objetoA);
  const clavesB = Object.keys(objetoB);

  // Verificar si el número de claves es el mismo
  if (clavesA.length !== clavesB.length) {
    return false;
  }

  // Verificar si las claves son las mismas
  for (const clave of clavesA) {
    if (!clavesB.includes(clave)) {
      return false;
    }
  }

  // Verificar si los valores son iguales para cada clave
  for (const clave of clavesA) {
    const valorA = objetoA[clave];
    const valorB = objetoB[clave];

    // Si los valores son objetos, hacer una comparación recursiva
    if (typeof valorA === "object" && typeof valorB === "object") {
      if (!equalObjects(valorA, valorB)) {
        return false;
      }
    } else {
      // Comparar directamente los valores
      if (valorA !== valorB) {
        return false;
      }
    }
  }

  // Si pasó todas las pruebas, los objetos son iguales
  return true;
}
