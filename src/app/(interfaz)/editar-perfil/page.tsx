"use client";

import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import { ErrorAPI } from "@/interfaces/API";
import React, { useEffect, useState } from "react";

const EditarPerfil = () => {
  const [initialForm, setInitialForm] = useState();

  const [imgUrl, setImgUrl] = useState<string | undefined>();

  const [file, setFile] = useState<File | null>(null);

  const {
    error,
    setError,
    fetchCancelables,
    isSomethingLoading,
    setIsSomethingLoading,
    successMessage,
    setSuccessMessage,
    fetchAPI,
  } = useRequestAPIFeatures();

  useEffect(() => {
    const fetchAnyUser = async () => {
      try {
        const fetchCancelable = fetchAPI(`/api/auth/me`, "GET");
        if (fetchCancelable === undefined) return;
        setIsSomethingLoading(true);

        const res = await fetchCancelable.fetch();

        if (!res.ok) {
          const { message }: ErrorAPI = await res.json();
          if (!message) throw new Error();
          setError(() => ({ message }));
        } else {
          // const teacher: TeacherResponse = await res.json();
          const g = await res.json();
          console.log(g);

          // setImgUrl(() => teacher.Foto_Perfil_URL);
          // setInitialForm(() => teacher);
          // setForm(() => teacher);
        }
      } catch (error) {
        setError(() => ({
          message: "No se pudieron obtener tus datos",
        }));
        setIsSomethingLoading(false);
      }
    };
    fetchAnyUser();
  }, [fetchAPI]);

  return (
    <div>
      {error && <ErrorMessage message={error.message} />}

      {successMessage && <SuccessMessage message={successMessage.message} />}
    </div>
  );
};

export default EditarPerfil;
