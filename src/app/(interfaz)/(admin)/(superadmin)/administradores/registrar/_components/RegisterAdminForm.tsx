import InputPassword from "@/components/shared/InputPassword";
import React, { ChangeEventHandler } from "react";
import { RegisterAdminFormFields } from "../page";

const RegisterAdminForm = ({
  form,
  handleChange,
}: {
  form: RegisterAdminFormFields;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      <label className="font-bold flex flex-col gap-y-2 w-[min(80vw,30rem)]">
        Nombre de Usuario:
        <input
          required
          className="custom-input w-full py-2"
          type="text"
          name="Nombre_Usuario"
          onChange={handleChange}
          value={form.Nombre_Usuario}
        />
      </label>
      <label className="font-bold w-[min(80vw,30rem)] flex flex-col gap-y-2">
        Contraseña:
        <InputPassword
          placeholder=""
          name="Contraseña"
          value={form.Contraseña}
          onChange={handleChange}
          min={8}
          max={20}
        />
      </label>
    </>
  );
};

export default RegisterAdminForm;
