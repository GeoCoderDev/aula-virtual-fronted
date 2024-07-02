import React from "react";
import { IconProps } from "../icon.interface";

const ArchivoIcon = ({
  className,
  fillColor = "#F2960C",
  onClick,
  title,
}: IconProps) => {
  return (
    <div
      title={title ?? ""}
      onClick={() => {
        onClick?.();
      }}
    >
      <svg
        viewBox="0 0 33 33"
        className={`${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.7154 24.75C32.3936 25.8321 31.8065 26.8235 30.9856 27.6444L27.6444 30.9856C26.8235 31.8065 25.8308 32.3936 24.7486 32.7154V26.125C24.7486 25.366 25.366 24.75 26.1236 24.75H32.7154ZM33 6.875V22H26.125C23.8507 22 22 23.8507 22 26.125V33H6.875C3.08413 33 0 29.9159 0 26.125V6.875C0 3.08413 3.08413 0 6.875 0H26.125C29.9159 0 33 3.08413 33 6.875ZM9.625 24.0625C9.625 22.924 8.701 22 7.5625 22C6.424 22 5.5 22.924 5.5 24.0625C5.5 25.201 6.424 26.125 7.5625 26.125C8.701 26.125 9.625 25.201 9.625 24.0625ZM9.625 16.5C9.625 15.3615 8.701 14.4375 7.5625 14.4375C6.424 14.4375 5.5 15.3615 5.5 16.5C5.5 17.6385 6.424 18.5625 7.5625 18.5625C8.701 18.5625 9.625 17.6385 9.625 16.5ZM9.625 8.9375C9.625 7.799 8.701 6.875 7.5625 6.875C6.424 6.875 5.5 7.799 5.5 8.9375C5.5 10.076 6.424 11 7.5625 11C8.701 11 9.625 10.076 9.625 8.9375Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default ArchivoIcon;
