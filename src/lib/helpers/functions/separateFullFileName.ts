import { FullFileName } from "@/interfaces/FullFileName";

export default function separateFullFileName(
  nombreArchivo: string
): FullFileName {
  // Dividir el nombre del archivo por el punto
  const partes = nombreArchivo.split(".");

  // Si hay más de una parte, la última es la extensión
  const extension = partes.length > 1 ? (partes.pop() as string) : "";

  // El resto es el nombre del archivo
  const nombre = partes.join(".");

  return {
    Nombre: nombre,
    Extension: extension,
  };
}
