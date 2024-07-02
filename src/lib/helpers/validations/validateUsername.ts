import { ErrorAPI } from "@/interfaces/API";
import { ValidationsResponse } from "@/interfaces/ValidationsResponse";

const validateUsername = (
  username: string,
  setError?: React.Dispatch<React.SetStateAction<ErrorAPI | null>>
): ValidationsResponse => {

  const usernameRegex = /^[a-zA-Z\u00D1\u00F1][a-zA-Z\u00D1\u00F10-9_]{7,29}$/gi;
  const isValidFormat = usernameRegex.test(username);

  if (isValidFormat) {
    return { status: true };
  } else {
    let messageError = "";

    if(typeof username === "number"){
        messageError = "El nombre de usuario no puede ser un número";
    } else if (username.length < 8) {
      messageError = "El nombre de usuario debe tener al menos 8 caracteres.";
    } else if (username.length > 30) {
      messageError = "El nombre de usuario no debe tener más de 30 caracteres.";
    } else if (!/^[a-zA-ZÑñ]/.test(username)) {
      messageError =
        "El nombre de usuario debe comenzar con una letra del alfabeto o la letra 'ñ'.";
    } else if (/[^a-zA-ZÑñ0-9_]/.test(username)) {
      messageError =
        "El nombre de usuario solo puede contener letras, números, la letra 'ñ' y guiones bajos.";
    }

    setError?.({ message: messageError });
    return { status: false, messageError };
  }
};

export default validateUsername;