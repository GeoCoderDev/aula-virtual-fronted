"use client";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";
import validateDNI from "@/lib/helpers/validations/validateDNI";
import React, { useEffect, useState } from "react";

const VerEstudiante = ({ params: { DNI } }: { params: { DNI: string } }) => {
  const [errorDNI, setErrorDNI] = useState<ErrorAPI | null>(null);

  useEffect(() => {
    const { status, messageError } = validateDNI(DNI);

    if (!status)
      setErrorDNI(() => ({ message: messageError ?? "El DNI no es valido" }));
  }, []);

  return (
    <>
      {errorDNI ? (
        <ErrorMessage message={errorDNI.message} />
      ) : (
        <div>VerEstudiante {DNI}</div>
      )}
    </>
  );
};

export default VerEstudiante;
