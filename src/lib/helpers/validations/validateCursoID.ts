import { ErrorAPI } from "@/interfaces/API";
import { ValidationsResponse } from "@/interfaces/ValidationsResponse";

const validateCourseId = (
  courseId: number | string,
  setError?: React.Dispatch<React.SetStateAction<ErrorAPI | null>>
): ValidationsResponse => {
  const isValidNumber = !isNaN(Number(courseId));
  const isValidFormat = isValidNumber && Number.isInteger(Number(courseId)) && Number(courseId) > 0;

  if (isValidFormat) {
    return { status: true };
  } else {
    let messageError = "";

    if (!isValidNumber) {
      messageError = "El ID del curso debe ser un valor numérico.";
    } else if (Number(courseId) <= 0) {
      messageError = "El ID del curso debe ser un número entero positivo.";
    }

    setError?.({ message: messageError });
    return { status: false, messageError };
  }
};

export default validateCourseId;