"use client";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import WarningMessage from "@/components/shared/messages/WarningMessage";
import { Admin } from "@/interfaces/Admin";
import Link from "next/link";
import React, { useRef, useState } from "react";
import AdminRow from "./_components/AdminRow";

const limitAdminsRequired = 50;

interface SearchTermsAdmin {
  username: string;
}

const searchTermsInitial: SearchTermsAdmin = {
  username: "",
};

const Administradores = () => {
  const inputUsername = useRef<HTMLInputElement>();

  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);

  const {
    fetchNextResults,
    results,
    allResultsGetted,
    error,
    isLoading,
    setResults,
  } = useBatchAPI<Admin>(
    "/api/admins",
    limitAdminsRequired,
    0,
    searchTerms as any,
    [inputUsername]
  );

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const handleRemoveAdmin = (idAdmin: number) => {
    setResults((prevAdmins) =>
      prevAdmins.filter((admin) => admin.Id_Admin !== idAdmin)
    );
  };

  const handleUpdateUsername = (idAdmin: number, newUsername: string) => {
    setResults((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.Id_Admin === idAdmin
          ? { ...admin, Nombre_Usuario: newUsername }
          : admin
      )
    );
  };

  return (
    <div className="flex flex-col items-start justify-start gap-y-6 -border-2">
      <div className="flex justify-between items-start w-full">
        <h1 className=" text-4xl  font-extrabold">Buscar Administrador</h1>

        <Link href={"/administradores/registrar"}>
          <button className="px-4 py-3  rounded-[0.5rem] bg-verde-spotify font-bold">
            Registrar Administradores
          </button>
        </Link>
      </div>

      <div className="flex  items-center gap-3">
        <p className="font-semibold">NOMBRE DE USUARIO:</p>
        <input
          ref={inputUsername as React.LegacyRef<HTMLInputElement>}
          maxLength={100}
          name="username"
          style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
          className="outline-none w-[50%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
          type="text"
          onChange={handleInputTextChange}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-y-4">
        <table>
          <thead>
            <tr className="font-semibold bg-verde-spotify text-black">
              <td className="px-8 py-3 rounded-l">ID</td>
              <td className="px-8 py-3">Nombre de Usuario</td>
              <td className="px-60 py-3 rounded-r">Acciones</td>
            </tr>
          </thead>
          <tbody>
            {results.map((admin) => (
              <AdminRow
                key={admin.Id_Admin}
                admin={admin}
                handleRemoveAdmin={handleRemoveAdmin}
                handleUpdateUsername={handleUpdateUsername}
              />
            ))}
          </tbody>
        </table>

        {!error && isLoading && (
          <Loader
            color="black"
            durationSegundos={1}
            backgroundSize="12px"
            width="40px"
          />
        )}

        {!error && !isLoading && results.length === 0 && (
          <WarningMessage message="No se encontraron resultados" />
        )}

        {!error && !isLoading && !allResultsGetted && (
          <button
            className="bg-amarillo-pooh text-white px-3 py-2 rounded-[0.5rem]"
            onClick={() => {
              fetchNextResults?.();
            }}
          >
            Cargar mas
          </button>
        )}

        {error && !isLoading && <ErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

export default Administradores;
