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
}) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <div className="w-full relative">
      <input
        disabled={disabled}
        required={required}
        name={name}
        onChange={onChange}
        style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
        className={`outline-none w-full px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black ${className}`}
        type={visiblePassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
      />
      <Image
        width={34}
        height={34}
        onClick={(e) => {
          setVisiblePassword(!visiblePassword);
        }}
        src={visiblePassword ? "/icons/ojo.svg" : "/icons/ojo_cerrado.svg"}
        alt="Icono-Ojo"
        className="-border-2 cursor-pointer absolute aspect-auto w-6 top-0 right-2 bottom-1/2 translate-y-1/2"
      />
    </div>
  );
};

export default InputPassword;
