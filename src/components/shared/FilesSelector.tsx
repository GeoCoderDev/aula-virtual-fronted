import { ErrorAPI } from "@/interfaces/API";
import validateFileExtension from "@/lib/helpers/validations/validateFileExtension";
import React, { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import FileBadge from "./FileBadge";

const FilesSelector = ({
  className,
  setError,
  setFiles,
  files,
}: {
  className?: string;
  setError: Dispatch<SetStateAction<ErrorAPI | null>>;
  setFiles: Dispatch<SetStateAction<File[]>>;
  files: File[];
}) => {
  const handleAddFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];

      // Verificar si el archivo ya existe en el array de files
      const fileExists = files.some(
        (file) => file.name === newFile.name && file.type === newFile.type
      );

      if (fileExists) {
        setError(()=>({ message: "El archivo ya ha sido agregado" }));
        return;
      }

      const { status } = validateFileExtension(newFile.name, setError);

      if (status) {
        setFiles((prev) => [...prev, newFile]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`${className} w-full flex flex-col font-semibold text-[1.2rem] italic break-words`}
    >
      Archivos adicionales:
      <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center items-center">
        <div className="rounded-[0.5rem] flex-1 min-w-[min(80vw,18rem,75%)] border-2 border-black min-h-[3.5rem] p-2 px-3 flex justify-start flex-wrap gap-3 items-center">
          {files.map((file, index) => (
            <FileBadge
              file={file}
              key={index}
              handleRemoveFile={() => {
                handleRemoveFile(index);
              }}
            />
          ))}
        </div>

        <label className="flex flex-col gap-y-2 font-bold">
          <input
            onClick={() => {
              setError(null);
            }}
            className="hidden"
            type="file"
            name="Archivo"
            onChange={handleAddFile}
          />
          <span
            className={`w-max max-w-[8.5rem] text-wrap text-center bg-black py-2 leading-5 rounded-lg cursor-pointer break-words text-[0.9rem] px-3 text-white`}
          >
            Añadir Archivo
          </span>
        </label>
      </div>
    </div>
  );
};

export default FilesSelector;
