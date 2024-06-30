import { HoraAcademica } from "@/interfaces/Horario";

const formatTime = (time: string) => {
  return time.substring(0, 5); // Remove seconds
};

export const formatterHoursAndMinutes = (horasAcademicas: HoraAcademica[]) => {
  const hoursAndMinutes: string[] = [];
  for (let i = 0; i < horasAcademicas.length; i++) {
    const startHour = formatTime(horasAcademicas[i].Valor);
    const endHour =
      i < horasAcademicas.length - 1
        ? formatTime(horasAcademicas[i + 1].Valor)
        : null;
    if (endHour) {
      hoursAndMinutes.push(`${startHour} - ${endHour}`);
    }
  }
  return hoursAndMinutes;
};
