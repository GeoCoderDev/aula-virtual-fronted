import { ErrorAPI } from "@/interfaces/API";
import { ValidationsResponse } from "@/interfaces/ValidationsResponse";

const validateDNI = (
  dni: string,
  setError?: React.Dispatch<React.SetStateAction<ErrorAPI | null>>
): ValidationsResponse => {
  const dniRegex = /^\d{8}$/; // Expresión regular para validar un DNI peruano de 8 dígitos
  const isValidFormat = dniRegex.test(dni);

  if (isValidFormat) {
    return { status: true };
  } else {
    let messageError = "";

    if (typeof dni !== "string") {
      messageError = "El DNI debe ser un texto.";
    } else if (dni.length !== 8) {
      messageError = "El DNI debe tener exactamente 8 dígitos.";
    } else if (!/^\d+$/.test(dni)) {
      messageError = "El DNI solo puede contener números.";
    }

    setError?.({ message: messageError });
    return { status: false, messageError };
  }
};

export default validateDNI;
