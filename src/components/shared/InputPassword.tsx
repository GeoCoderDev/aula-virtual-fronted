import generatePassword from "@/lib/helpers/generators/passwordGenerator";
import Image from "next/image";
import React, { ChangeEventHandler, useState } from "react";

const InputPassword = ({
  className,
  max,
  min,
  onChange,
  value,
  name = "password",
  disabled = false,
  required = true,
  placeholder = "Contraseña*",
  generator = false,
  setPassword,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  min: number;
  max: number;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  generator?: boolean;
  setPassword?: (password: string) => void;
}) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <div className="w-full relative">
      <input
        disabled={disabled}
        required={required}
        name={name}
        onChange={onChange}
        style={{ boxShadow: "0 0 10px 4px var(--color-interfaz)" }}
        className={`outline-none w-full px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black ${className}`}
        type={visiblePassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        minLength={min}
        maxLength={max}
      />

      <div className="flex items-center justify-center gap-x-3 absolute top-0 right-2 bottom-1/2 translate-y-1/2">
        <Image
          width={34}
          height={34}
          onClick={(e) => {
            setVisiblePassword(!visiblePassword);
          }}
          src={visiblePassword ? "/icons/ojo.svg" : "/icons/ojo_cerrado.svg"}
          alt="Icono-Ojo"
          title={visiblePassword ? "Ocultar Constraseña" : "Ver Contraseña"}
          className="-border-2 cursor-pointer  aspect-auto w-6 "
        />

        {generator && (
          <Image
            width={34}
            height={34}
            onClick={(e) => {
              const passwordGenerated = generatePassword(undefined, "chavez");
              setPassword?.(passwordGenerated);
            }}
            src="/icons/Foco Icono.svg"
            alt="Icono-Foco"
            title="Generar Contraseña"
            className="-border-2 cursor-pointer aspect-auto w-[1rem]"
          />
        )}
      </div>
    </div>
  );
};

export default InputPassword;
