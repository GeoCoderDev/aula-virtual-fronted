import { ErrorAPI } from "@/interfaces/API";
import { ValidationsResponse } from "@/interfaces/ValidationsResponse";

const validatePassword = (
  password: string,
  setError?: React.Dispatch<React.SetStateAction<ErrorAPI | null>>
): ValidationsResponse => {
  const passwordRegex = /^.{8,20}$/;
  const isValidLength = passwordRegex.test(password);

  if (isValidLength) {
    return { status: true };
  } else {
    let messageError = "";

    if (password.length < 8) {
      messageError = "La contraseña debe tener al menos 8 caracteres.";
    } else if (password.length > 20) {
      messageError = "La contraseña no debe tener más de 20 caracteres.";
    }

    setError?.({ message: messageError });
    return { status: false, messageError };
  }
};

export default validatePassword;