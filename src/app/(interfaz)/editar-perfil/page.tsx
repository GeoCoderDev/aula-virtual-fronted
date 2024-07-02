"use client";

import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import { ErrorAPI } from "@/interfaces/API";
import { Role } from "@/interfaces/Role";
import React, { useEffect, useState } from "react";
import EditarAdminForm from "./_components/EditarAdminForm";
import EditarUsuarioForm from "./_components/EditarUsuarioForm";
import { Admin } from "@/interfaces/Admin";
import { Superadmin } from "@/interfaces/Superadmin";
import { TeacherResponse } from "@/interfaces/Teacher";
import { StudentResponse } from "@/interfaces/Student";

const EditarPerfil = () => {
  const [role, setRole] = useState<Role>();
  const [anyUserGetted, setAnyUserGetted] = useState<
    Superadmin | Admin | TeacherResponse | StudentResponse
  >();

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
          const anyUser = await res.json();

          if (anyUser["DNI_Estudiante"]) {
            setRole(() => "student");
          } else if (anyUser["DNI_Profesor"]) {
            setRole(() => "teacher");
          } else if (anyUser["Id_Admin"]) {
            setRole(() => "admin");
          } else {
            setRole(() => "superadmin");
          }

          setAnyUserGetted(() => anyUser);
        }

        setIsSomethingLoading(false);
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
    <>
      <div className="-border-2 w-full flex-col min-w-full flex items-start justify-center gap-y-4">
        <h2 className="section-tittle">Editar Perfil</h2>

        {role &&
          (role === "superadmin" || role === "admin" ? (
            <EditarAdminForm />
          ) : (
            <EditarUsuarioForm
              user={anyUserGetted as TeacherResponse | StudentResponse}
            />
          ))}

        {isSomethingLoading && (
          <Loader
            color="black"
            className="self-center"
            durationSegundos={1}
            backgroundSize="12px"
            width="40px"
          />
        )}

        {error && <ErrorMessage message={error.message} />}

        {successMessage && <SuccessMessage message={successMessage.message} />}
      </div>
    </>
  );
};

export default EditarPerfil;
