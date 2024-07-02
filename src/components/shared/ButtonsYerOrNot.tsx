import React from "react";

const ButtonsYerOrNot = ({
  onClickYes,
  onClickNo,
  className = "",
}: {
  onClickYes: () => void;
  onClickNo: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => void;
  className?: string;
}) => {
  return (
    <div className={`w-full flex justify-evenly items-center ${className}`}>
      <button
        onClick={onClickYes}
        className="bg-verde-spotify rounded-lg py-2 w-[2.5rem] "
      >
        Si
      </button>
      <button
        onClick={onClickNo}
        className="bg-rojo-orange rounded-lg py-2 w-[2.5rem] text-white"
      >
        No
      </button>
    </div>
  );
};

export default ButtonsYerOrNot;
