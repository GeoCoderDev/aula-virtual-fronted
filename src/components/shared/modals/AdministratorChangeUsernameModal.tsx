import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  ReactEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ModalContainer from "../ModalContainer";
import { Admin } from "@/interfaces/Admin";
import useModalFeatures from "@/app/hooks/useModalFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import Loader from "@/components/Loader";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

interface UpdateAdminPasswordForm {
  newUsername: string;
}

const initialForm: UpdateAdminPasswordForm = {
  newUsername: "",
};

const AdministratorChangeUsernameModal = ({
  admin: { Id_Admin, Nombre_Usuario },
  handleUpdateUsername,
  setDeleteModalIsShowing,
}: {
  admin: Admin;
  setDeleteModalIsShowing: Dispatch<SetStateAction<boolean>>;
  handleUpdateUsername: (idAdmin: number, username: string) => void;
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

  const [form, setForm] = useState<UpdateAdminPasswordForm>(initialForm);

  const updateAdminUsername = async () => {
    try {
      setIsSomethingLoading(true);

      const fetchCancelable = fetchAPI(
        `/api/admins/updateUsername/${Id_Admin}`,
        "PUT",
        null,
        JSON.stringify({ ...form })
      );

      if (fetchCancelable === undefined) return;

      const response = await fetchCancelable.fetch();

      if (!response.ok) {
        const { message }: ErrorAPI = await response.json();
        setError(() => ({
          message: message ?? "No se pudio actualizar",
        }));
      } else {
        const { message }: SuccessMessageAPI = await response.json();
        setSuccessMessage(() => ({ message }));
        handleUpdateUsername(Id_Admin, form.newUsername);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setIsSomethingLoading(false);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSuccessMessage(null);
    setError(null);
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateAdminUsername();
  };

  useEffect(() => {
    setForm(() => ({ newUsername: Nombre_Usuario }));
  }, []);

  return (
    <ModalContainer
      eliminateModal={(
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
      ) => {
        if (!isSomethingLoading) {
          setDeleteModalIsShowing(false);
        }
        event.stopPropagation();
      }}
    >
      <form
        className="w-full flex flex-col items-center justify-center gap-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl">Cambiar Nombre de Usuario</h2>
        <input
          disabled={isSomethingLoading}
          required
          className="custom-input w-44 text-[1rem] py-2"
          type="text"
          name="newUsername"
          onChange={handleChange}
          value={form.newUsername}
        />

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
            form.newUsername === Nombre_Usuario
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

export default AdministratorChangeUsernameModal;
