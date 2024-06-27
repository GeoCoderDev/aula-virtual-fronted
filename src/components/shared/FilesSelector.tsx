import { ErrorAPI } from "@/interfaces/API";
import validateFileExtension from "@/lib/helpers/validations/validateFileExtension";
import React, { ChangeEventHandler, Dispatch, SetStateAction } from "react";

const FilesSelector = ({
  className,
  setError,
  setFiles,
}: {
  className: string;
  setError: Dispatch<SetStateAction<ErrorAPI | null>>;
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => {

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {      

      const { status } = validateFileExtension(
        e.target.files[0].name,
        setError
      );

      if (status) setFiles((prev) => [...prev, e.target.files![0]]);
    }
  };

  return (
    <div className={`${className}`}>
      <div></div>

      <label className="flex flex-col gap-y-2 font-bold">
        <input
          className="hidden"
          required
          type="file"
          name="Archivo"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FilesSelector;
