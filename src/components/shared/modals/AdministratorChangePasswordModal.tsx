import { ChangePasswordForm } from "@/interfaces/ChangePasswordForm";
import ModalContainer from "../ModalContainer";
import useModalFeatures from "@/app/hooks/useModalFeatures";
import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import Loader from "@/components/Loader";
import { Admin } from "@/interfaces/Admin";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import InputPassword from "../InputPassword";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

const initialForm: ChangePasswordForm = {
  password: "",
  confirmPassword: "",
};

const AdministratorChangePasswordModal = ({
  admin: { Id_Admin, Nombre_Usuario },
  setDeleteModalIsShowing,
}: {
  admin: Admin;
  setDeleteModalIsShowing: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useModalFeatures();

  const updatePassword = async () => {
    try {
      if (form.password !== form.confirmPassword)
        return setError(() => ({ message: "Las contraseñas no coinciden" }));

      setIsSomethingLoading(true);

      const fetchCancelable = fetchAPI(
        `/api/admins/updatePassword/${Id_Admin}`,
        "PUT",
        null,
        JSON.stringify(form)
      );

      if (fetchCancelable === undefined) return;

      const res = await fetchCancelable.fetch();

      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();
        setError(() => ({
          message: message ?? "No se pudo actualizar la contraseña",
        }));
      } else {
        const { message }: SuccessMessageAPI = await res.json();
        setSuccessMessage(() => ({
          message: message ?? "Contraseña actualizada",
        }));
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setIsSomethingLoading(false);
    }
  };

  const [form, setForm] = useState<ChangePasswordForm>(initialForm);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updatePassword();
  };

  return (
    <ModalContainer
      eliminateModal={() => {
        if (!isSomethingLoading) setDeleteModalIsShowing(false);
      }}
    >
      <form
        className="w-full flex flex-col items-center justify-center gap-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl">Cambiar Contraseña</h2>
        <label className="flex flex-col gap-y-2 font-bold">
          Nueva Contraseña:
          <InputPassword
            name="password"
            min={8}
            max={20}
            className=""
            onChange={handleChange}
            value={form.password}
            disabled={isSomethingLoading}
          />
        </label>
        <label className="flex flex-col gap-y-2 font-bold">
          Confirmar Contraseña:
          <InputPassword
            disabled={isSomethingLoading}
            className="custom-input w-44 text-[1rem] py-2"
            name="confirmPassword"
            onChange={handleChange}
            value={form.confirmPassword}
            min={8}
            max={20}
          />
        </label>

        
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
            Boolean(error) || Boolean(successMessage) || isSomethingLoading
          }
          type="submit"
        >
          Guardar Cambios{" "}
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default AdministratorChangePasswordModal;
