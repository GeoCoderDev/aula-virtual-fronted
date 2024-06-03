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
    <div className="flex flex-col items-start justify-center gap-y-6 w-max ">
      <div className="flex justify-between items-center w-full flex-wrap gap-x-6">
        <h1 className="section-tittle">Buscar Administrador</h1>

        <Link href={"/administradores/registrar"}>
          <button
            type="button"
            className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2"
          >
            Registrar Administradores
          </button>
        </Link>
      </div>


      <form className="flex flex-wrap max-w-full items-center gap-x-5 gap-y-4 justify-start">
        <label className="font-semibold flex w-min flex-row items-center gap-x-3 whitespace-nowrap">
          Nombre de usuario:
          <input
            ref={inputUsername as React.LegacyRef<HTMLInputElement>}
            maxLength={60}
            name="username"
            className="custom-input w-[10rem]"
            type="text"
            placeholder=""
            onChange={handleInputTextChange}
          />
        </label>
      </form>

      <div className="flex flex-col items-center justify-center gap-y-4">
        <div
          className="w-full max-w-[80vw] overflow-auto max-h-[300px]"
          style={{ overflowX: "auto", margin: "0", padding: "0" }}
        >
          <table className="w-full min-w-full">
            <colgroup>
              <col className="w-[6rem]" />
              <col className="w-[12rem]" />
              <col className="w-[15rem]" />
            </colgroup>
            <thead className="sticky top-0">
              <tr className="font-semibold bg-verde-spotify text-black">
                <th className="text-center px-4 py-2 rounded-1">ID</th>
                <th className="text-center px-100 py-2">
                  Nombre de Usuario
                </th>
                <td className="text-center px-30 py-2 rounded-r">Acciones</td>
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
        </div>
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