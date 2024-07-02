import { IconProps } from "../icon.interface";
const PerfilIcon = ({ className, fillColor }: IconProps) => {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="24.6578"
        cy="24.6578"
        r="23.1578"
        fill={fillColor}
        fillOpacity="0.01"
        stroke={fillColor}
        strokeWidth="3"
      />
      <g clipPath="url(#clip0_41_2177)">
        <path
          d="M23.6821 8.84158C20.5322 9.37041 17.8995 12.026 17.3822 15.1875C17.273 15.8888 17.273 17.1304 17.3822 17.8316C17.8995 21.0218 20.5437 23.666 23.7339 24.1833C24.4351 24.2925 25.6767 24.2925 26.378 24.1833C29.5682 23.666 32.2123 21.0218 32.7297 17.8316C32.8389 17.1304 32.8389 15.8888 32.7297 15.1875C32.2123 11.9973 29.5682 9.35316 26.378 8.83584C25.7055 8.72662 24.3432 8.73237 23.6821 8.84158Z"
          fill={fillColor}
        />
        <path
          d="M21.6932 26.0859C18.388 26.609 15.5542 28.4944 13.778 31.3569C12.7434 33.0124 12.1226 35.1392 12.1226 36.9901C12.1226 37.6971 12.18 37.858 12.5019 38.0707C12.6629 38.1742 13.0193 38.1799 25.0558 38.1799C37.0923 38.1799 37.4487 38.1742 37.6097 38.0707C37.9316 37.858 37.9891 37.6971 37.9891 36.9786C37.9891 34.1563 36.6727 31.1787 34.4999 29.0979C32.9077 27.5689 31.1373 26.6435 28.8725 26.1549C28.338 26.0399 28.1195 26.0342 25.257 26.0169C22.837 26.0054 22.1013 26.0169 21.6932 26.0859Z"
          fill={fillColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_41_2177">
          <rect
            width="29.4303"
            height="29.4303"
            fill="white"
            transform="translate(10.3408 8.74963)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PerfilIcon;
