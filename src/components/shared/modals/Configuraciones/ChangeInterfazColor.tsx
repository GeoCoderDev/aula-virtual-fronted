"use client";
import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import ModalContainer from "../../ModalContainer";
import Loader from "../../Loader";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";

const ChangeInterfazColor = ({
  eliminateModal,
  setInterfazColor,
  interfazColor,
  setInitialColor,
  initialColor,
}: {
  eliminateModal: () => void;
  setInterfazColor: Dispatch<React.SetStateAction<string | undefined>>;
  interfazColor?: string;
  initialColor?: string;
  setInitialColor: Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null);
    setSuccessMessage(null);
    setInterfazColor(e.target.value);
    document.documentElement.style.setProperty(
      "--color-interfaz",
      e.target.value
    );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const fetchCancelable = fetchAPI(
        "/api/configurations/interfazColor",
        "POST",
        null,
        JSON.stringify({
          Valor: interfazColor,
        })
      );

      if (!fetchCancelable) return;

      setIsSomethingLoading(true);

      const res = await fetchCancelable.fetch();
      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();

        throw new Error();
      } else {
        const { message }: SuccessMessageAPI = await res.json();

        setSuccessMessage(() => ({
          message: "Color actualizado",
        }));

        setInitialColor(() => interfazColor);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudo actualizar el color",
      }));

      setInterfazColor(() => initialColor);
      document.documentElement.style.setProperty(
        "--color-interfaz",
        initialColor!
      );

      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer
      eliminateModal={() => {
        eliminateModal();
      }}
    >
      {interfazColor && (
        <form
          className="flex flex-col gap-y-4 items-center justify-center w-full max-w-md px-4"
          onSubmit={handleSubmit}
        >
          <h4 className="text-[1.5rem] font-semibold">Frecuencia de backup</h4>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <label className="font-semibold text-sm sm:text-base">Color:</label>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 border border-gray-300"
                style={{
                  backgroundColor: interfazColor,
                  border: "1px solid black",
                }}
              ></div>
              <input
                type="text"
                value={interfazColor}
                readOnly
                className="border px-2 py-1 text-center w-24 text-sm"
                style={{ minWidth: "80px" }}
              />
            </div>
            <div className="w-full sm:w-auto mt-2 sm:mt-0">
              <input
                type="color"
                name="Valor"
                value={interfazColor}
                onChange={handleChange}
                id="color-picker"
                className="sr-only" // Esto oculta el selector de color predeterminado
              />
              <label
                htmlFor="color-picker"
                className="button-with-loader cursor-pointer w-full sm:w-auto inline-block text-center px-4 py-2 text-sm"
                style={{ backgroundColor: interfazColor }}
              >
                Seleccionar Color
              </label>
            </div>
          </div>

          {!successMessage && !isSomethingLoading && error && (
            <ErrorMessage message={error.message} />
          )}

          {!error && !isSomethingLoading && successMessage && (
            <SuccessMessage
              className="text-rojo-orange"
              message={successMessage.message}
            />
          )}

          <button
            className="button-with-loader py-2"
            disabled={
              Boolean(error) ||
              Boolean(successMessage) ||
              isSomethingLoading ||
              initialColor === interfazColor
            }
            type="submit"
          >
            Cambiar Color
            {isSomethingLoading && (
              <Loader backgroundSize="8px" width="25px" color="black" />
            )}
          </button>
        </form>
      )}
    </ModalContainer>
  );
};

export default ChangeInterfazColor;
