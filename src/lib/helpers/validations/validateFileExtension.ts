import { ErrorAPI } from "@/interfaces/API";
import { ValidationsResponse } from "@/interfaces/ValidationsResponse";

const validateFileExtension = (
  fileName: string,
  setError?: React.Dispatch<React.SetStateAction<ErrorAPI | null>>
): ValidationsResponse => {
  // Lista de extensiones de archivo permitidas
  const allowedExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "mp4",
    "mov",
    "mp3",
    "zip",
    "rar",
    "7z",
    "tar",
    "gz",
    "csv",
    "html",
    "css",
    "js",
  ];

  // Obtener la extensión del archivo
  const fileExtension = fileName.split(".").pop()?.toLowerCase();

  if (fileExtension && allowedExtensions.includes(fileExtension)) {
    return { status: true };
  } else {
    let messageError = "La extensión del archivo no está permitida.";

    setError?.({ message: messageError });
    return { status: false, messageError };
  }
};

export default validateFileExtension;
