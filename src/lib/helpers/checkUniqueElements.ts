const checkUniqueElements = (arr: (string | number)[]): boolean => {
    const set = new Set(arr); // Utilizamos un Set para eliminar duplicados
    return set.size === arr.length; // Comprobamos si el tamaño del set es igual al tamaño del array original
  };
  
export default checkUniqueElements;
  