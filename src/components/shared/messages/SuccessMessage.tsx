import React from "react";

const SuccessMessage = ({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={`w-full text-wrap break-words text-verde-spotify font-bold text-center ${className}`}
    >
      {message}
    </div>
  );
};

export default SuccessMessage;
