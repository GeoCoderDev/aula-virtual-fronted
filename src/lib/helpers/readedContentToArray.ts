import { Alerts } from "@/interfaces/Alerts";
import checkUniqueElements from "./checkUniqueElements";
import { parseISO, isValid } from "date-fns";
import validateUsername from "./validations/validateUsername";
import { BD_DataTypes } from "@/interfaces/BD_DataTypes";
import validatePassword from "./validations/validatePassword";
import validateDNI from "./validations/validateDNI";

export interface CVSContentToArrayResponse {
  data?: number[][] | string[][] | (string | number)[][] | null;
  alerts: Alerts;
}

const readedContentToArray = <Headers>(
  content: string | ArrayBuffer | null | undefined,
  columnNames: string[],
  columnsTypes: BD_DataTypes[],
  minMaxLenghtColumns: number[][],
  columnsUnique: (keyof Headers)[]
): CVSContentToArrayResponse => {
  const alerts: Alerts = [];

  if (!content)
    return {
      data: null,
      alerts: [{ content: "Archivo sin contenido", type: "critical" }],
    };

  if (!checkUniqueElements(columnNames))
    return {
      data: null,
      alerts: [
        {
          content: "Hay nombres de columnas repetidos (error interno)",
          type: "critical",
        },
      ],
    };

  const rows = content.toString().split("\n"); // Convertir a string y luego dividir en filas

  // Procesar cada fila para separar los valores por comas y crear un array de arrays
  const data = rows.map((row) => row.split(","));

  // Filtrar los elementos que no son un array vacío
  const filteredData = data.filter((row) => row.length > 1);

  // Eliminar apóstrofos al inicio de los valores
  const sanitizedData = filteredData.map((row) =>
    row.map((item) => item.replace(/^'(.*)/, "$1").trim())
  );

  // Convertir los números en las filas a tipo number solo cuando sea necesario
  const parsedData = filteredData.map((row) =>
    row.map((item, columnIndex) =>
      columnsTypes[columnIndex] === "number" ? Number(item) : item.trim()
    )
  );

  // =======================================================
  // |                    VALIDACIONES                     |
  // =======================================================

  // Validacion de cantidad de columnas
  // Contadores para filas con más o menos columnas de lo esperado
  let rowsWithExcessColumns = 0;
  let rowsWithMissingColumns = 0;

  // Verificar la consistencia de la cantidad de columnas en cada fila
  parsedData.forEach((row) => {
    const rowLength = row.length;
    const expectedLength = columnNames.length;

    if (rowLength !== expectedLength) {
      if (rowLength < expectedLength) {
        rowsWithMissingColumns++;
      } else {
        rowsWithExcessColumns++;
      }
    }
  });

  // Generar mensaje indicando si hay más o menos columnas de la cuenta
  if (rowsWithMissingColumns > 0 && rowsWithExcessColumns > 0) {
    alerts.push({
      content: `Algunas filas tienen más columnas y otras tienen menos columnas de las esperadas.`,
      type: "critical",
    });
    return { data: null, alerts };
  } else if (rowsWithMissingColumns > 0) {
    alerts.push({
      content: `Algunas filas tienen menos columnas de las esperadas.`,
      type: "critical",
    });
    return { data: null, alerts };
  } else if (rowsWithExcessColumns > 0) {
    alerts.push({
      content: `Algunas filas tienen más columnas de las esperadas.`,
      type: "critical",
    });
    return { data: null, alerts };
  }

  // Validacion de valores unicos
  columnsUnique.forEach((uniqueColumn) => {
    const columnIndex = columnNames.indexOf(uniqueColumn as string);
    const uniqueValues: { [key: string]: number[] } = {};

    parsedData.forEach((row, rowIndex) => {
      const cellValue = row[columnIndex];

      // Verifica si el valor ya ha sido encontrado antes en esta columna
      if (uniqueValues.hasOwnProperty(cellValue)) {
        // Si ya se ha encontrado, agrega la fila actual a la lista de filas con el mismo valor
        uniqueValues[cellValue].push(rowIndex + 1); // Guardamos el número de fila
      } else {
        // Si es la primera vez que se encuentra este valor, regístralo en el objeto
        uniqueValues[cellValue] = [rowIndex + 1]; // Guardamos el número de fila en un array
      }
    });

    // Generar alertas solo para los valores duplicados encontrados
    Object.keys(uniqueValues).forEach((value) => {
      const rowsWithSameValue = uniqueValues[value];
      if (rowsWithSameValue.length > 1) {
        // Solo generar alerta si hay más de una fila asociada con este valor
        const duplicateRows = rowsWithSameValue.join(" y ");
        const alertMessage = `El valor '${value}' en la columna '${
          uniqueColumn as string
        }' se repite en las filas ${duplicateRows}`;
        alerts.push({
          content: alertMessage,
          type: "critical",
        });
      }
    });
  });

  // Validacion de tipos y longitud
  columnsTypes.forEach((columnType, columnIndex) => {
    const columnValues = parsedData.map((row) => row[columnIndex].toString());

    columnValues.forEach((value, rowIndex) => {
      let messageError = "";

      switch (columnType) {
        case "number":
          // Intenta convertir el valor a número
          const numericValue = Number(value);
          // Verifica si el valor es NaN (no es un número)
          if (isNaN(numericValue)) {
            // Si es NaN, genera una alerta indicando que el valor no es un número válido
            alerts.push({
              content: `El valor '${value}' en la fila ${
                rowIndex + 1
              } de la columna '${
                columnNames[columnIndex]
              }' no es un número válido.`,
              type: "critical",
            });
          }
          break;

        case "dni":
          const { status, messageError: dniMessageError } = validateDNI(value);

          if (!status) {
            messageError =
              dniMessageError ||
              `El DNI '${value}' en la fila ${
                rowIndex + 1
              } no cumple con el formato esperado.`;
          }
          break;
        case "username":
          const { status: usernameStatus, messageError: usernameMessageError } =
            validateUsername(value);

          if (!usernameStatus) {
            messageError =
              usernameMessageError ||
              `El nombre de usuario '${value}' en la fila ${
                rowIndex + 1
              } no cumple con el formato esperado.`;
          }
          break;
        case "password":
          const { status: passwordStatus, messageError: passwordMessageError } =
            validatePassword(value);

          if (!passwordStatus) {
            messageError =
              passwordMessageError ||
              `La contraseña en la fila ${
                rowIndex + 1
              } no cumple con el formato esperado.`;
          }
          break;

        case "string":
          const [minLength, maxLength] = minMaxLenghtColumns[columnIndex];

          if (value.length < minLength) {
            messageError = `El valor es demasiado corto (mínimo ${minLength} caracteres).`;
          } else if (value.length > maxLength) {
            messageError = `El valor es demasiado largo (máximo ${maxLength} caracteres).`;
          }
          break;

        case "date-database-format":
          // Verificar el formato de fecha si es requerido
          const dateFormatRegex = /^(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/;
          columnValues.forEach((value, index) => {
            if (!dateFormatRegex.test(value)) {
              alerts.push({
                content: `El valor '${value}' en la fila ${
                  index + 1
                } de la columna '${
                  columnNames[columnIndex]
                }' no cumple con el formato de fecha YYYY-MM-DD o DD/MM/YYYY (Ejemplo: 2003-01-01 o 01/01/2003).`,
                type: "advertency",
              });
            } else {
              let formattedDate = value;
              // Si el formato es DD/MM/YYYY, lo transformamos a YYYY-MM-DD
              if (value.includes("/")) {
                const parts = value.split("/");
                formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

                parsedData[rowIndex][columnIndex] = formattedDate; // Reemplazar el valor original con el nuevo formato
              }
              if (!isValid(parseISO(formattedDate))) {
                alerts.push({
                  content: `El valor '${value}' en la fila ${
                    index + 1
                  } de la columna '${
                    columnNames[columnIndex]
                  }' no es una fecha válida.`,
                  type: "advertency",
                });
              }
            }
          });
          break;
        default:
          break;
      }

      if (messageError) {
        alerts.push({
          content: `Error en la fila ${rowIndex + 1} de la columna '${
            columnNames[columnIndex]
          }': ${messageError}`,
          type: "critical",
        });
      }
    });
  });

  return { data: parsedData, alerts };
};

export default readedContentToArray;
