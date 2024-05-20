import InputPassword from "@/components/shared/InputPassword";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import { StudentForm } from "@/interfaces/Student";

import React, {
  ChangeEventHandler,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

const RegisterStudentForm = ({
  form,
  handleChange,
  selectGrado,
  setForm,
  handleSelectChange,
  availableSections,
  handleFileChange,
  file,
  setFile,
}: {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  form: StudentForm;
  selectGrado: MutableRefObject<HTMLSelectElement | undefined>;
  setForm: Dispatch<SetStateAction<StudentForm>>;
  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  availableSections: string[];
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
          name="DNI_Estudiante"
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

      <label className="flex flex-col gap-y-2 font-bold">
        Grado:
        <select
          ref={selectGrado as React.LegacyRef<HTMLSelectElement>}
          className="custom-input w-max px-3 text-center"
          name="Grado"
          required
          value={form.Grado}
          onChange={handleSelectChange}
        >
          <option disabled value={""}>
            - seleccione -
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>

      <label className="flex flex-col gap-y-2 font-bold">
        Sección:
        <select
          required
          value={form.Seccion}
          className="custom-input w-max px-3 text-center"
          name="Seccion"
          disabled={availableSections.length === 0}
          onChange={handleChange}
        >
          <option disabled value="">
            - seleccione -
          </option>
          {availableSections.map((section, index) => (
            <option value={section} key={index}>
              {section}
            </option>
          ))}
        </select>
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
        Teléfono:
        <input
          className="custom-input w-[10rem]"
          name="Telefono_Contacto_Emergencia"
          value={form.Telefono_Contacto_Emergencia}
          type="tel"
          required
          onChange={handleChange}
          maxLength={4}
          minLength={9}
        />
      </label>

      <label className="flex flex-col gap-y-2 font-bold" htmlFor="address">
        Domicilio:
        <input
          className="custom-input w-[18rem]"
          name="Direccion_Domicilio"
          type="text"
          required
          minLength={1}
          maxLength={200}
          onChange={handleChange}
          value={form.Direccion_Domicilio}
        />
      </label>
    </>
  );
};

export default RegisterStudentForm;
