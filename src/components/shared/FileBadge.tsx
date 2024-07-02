import separateFullFileName from "@/lib/helpers/functions/separateFullFileName";
import { Dispatch, SetStateAction } from "react";
import EquisIcon from "../icons/others/EquisIcon";

const FileBadge = ({
  className,
  file,
  handleRemoveFile,
}: {
  file: File;
  className?: string;
  handleRemoveFile: () => void;
}) => {
  return (
    <div
      className={` text-[0.9rem] flex  overflow-hidden text-ellipsis whitespace-nowrap bg-verde-spotify opacity-90 ${className} items-center w-max p-2 rounded-[0.5rem] h-[2rem] gap-x-2 max-w-[8rem]`}
      title={file.name}
    >
      <span className="flex justify-center max-w-[5rem] cursor-default">
        <span
          title={file ? file.name : "No hay nigun archivo seleccionado"}
          className="max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap -border-2"
        >
          {file
            ? `${separateFullFileName(file.name).Nombre}`
            : "No hay nigun archivo seleccionado"}
        </span>
        {file && "." + separateFullFileName(file.name).Extension}
      </span>

      <EquisIcon
        onClick={handleRemoveFile}
        className="w-[0.9rem] cursor-pointer"
      />
    </div>
  );
};

export default FileBadge;
