import InputPassword from "@/components/shared/InputPassword";
import { StudentRegisterForm } from "@/interfaces/Student";
import { TeacherRegisterForm } from "@/interfaces/Teacher";

import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

const RegisterTeacherForm = ({
  form,
  handleChange,
  setForm,
  handleFileChange,
  file,
  setFile,
}: {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  form: TeacherRegisterForm;
  setForm: Dispatch<SetStateAction<TeacherRegisterForm>>;
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}) => {
  return (
    <>
      <label className="flex flex-col gap-y-2 font-bold">
        Nombres:
        <input
          className="custom-input w-[15rem]"
          name="Nombres"
          type="text"
          onChange={handleChange}
          value={form.Nombres}
          minLength={1}
          maxLength={100}
          required
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold">
        Apellidos:
        <input
          className="custom-input w-[15rem]"
          name="Apellidos"
          type="text"
          value={form.Apellidos}
          onChange={handleChange}
          minLength={4}
          maxLength={100}
          required
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold">
        DNI:
        <input
          className="custom-input w-[8rem]"
          name="DNI_Profesor"
          value={form.DNI_Profesor}
          type="text"
          minLength={8}
          maxLength={8}
          onChange={handleChange}
          required
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold">
        Nombre Usuario:
        <input
          className="custom-input w-[14rem]"
          name="Nombre_Usuario"
          type="text"
          onChange={handleChange}
          value={form.Nombre_Usuario}
          min={8}
          maxLength={30}
          required
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold">
        Contraseña:
        <InputPassword
          placeholder=""
          name="Contraseña_Usuario"
          generator={true}
          setPassword={(password: string) => {
            setForm(() => ({ ...form, ["Contraseña_Usuario"]: password }));
          }}
          className="w-[19rem]"
          onChange={handleChange}
          value={form.Contraseña_Usuario}
          min={8}
          max={20}
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold">
        Fecha de Nacimiento:
        <input
          className="custom-input w-[11rem]"
          name="Fecha_Nacimiento"
          type="date"
          required
          value={form.Fecha_Nacimiento}
          placeholder="dd / mm / aa"
          onChange={handleChange}
        />
      </label>

      <label
        onMouseUp={() => {
          setFile(null);
        }}
        className="flex flex-col gap-y-2 font-bold"
      >
        Foto de Perfil:
        <input
          className="hidden"
          type="file"
          name="Foto_Perfil"
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg"
        />
        <span
          className={`w-max max-w-[8.5rem] text-wrap text-center bg-black py-1 leading-5 rounded-lg cursor-pointer break-words text-[0.9rem] px-3 ${
            file ? "text-verde-spotify" : "text-white"
          }`}
        >
          {file ? "Cambiar Archivo" : "Seleccionar Archivo"}
        </span>
      </label>

      <label className="flex flex-col gap-y-2 font-bold">
        Telefono:
        <input
          className="custom-input w-[10rem]"
          name="Telefono"
          value={form.Telefono}
          type="tel"
          required
          onChange={handleChange}
          minLength={9}
          maxLength={9}
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold">
        Domicilio:
        <input
          className="custom-input w-[15rem]"
          name="Direccion_Domicilio"
          value={form.Direccion_Domicilio}
          type="text"
          required
          minLength={1}
          maxLength={255}
          onChange={handleChange}
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold text-[0.9rem]">
        En caso de emergencia comunicarse con:
        <input
          className="custom-input w-[15rem]"
          name="Nombre_Contacto_Emergencia"
          value={form.Nombre_Contacto_Emergencia}
          type="text"
          required
          minLength={1}
          maxLength={200}
          onChange={handleChange}
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold text-[0.9rem]">
        Parentezco:
        <input
          className="custom-input w-[10rem]"
          name="Parentezco_Contacto_Emergencia"
          value={form.Parentezco_Contacto_Emergencia}
          type="text"
          required
          onChange={handleChange}
          minLength={1}
          maxLength={40}
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold text-[0.9rem]">
        Teléfono Contacto Emergencia:
        <input
          className="custom-input w-[10rem]"
          name="Telefono_Contacto_Emergencia"
          value={form.Telefono_Contacto_Emergencia}
          type="tel"
          required
          onChange={handleChange}
          minLength={9}
          maxLength={9}
        />
      </label>
    </>
  );
};

export default RegisterTeacherForm;
