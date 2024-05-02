import { IconProps } from "../icon.interface";

const ConfiguracionesIcon = ({ className, fillColor }: IconProps) => {
  return (
    <svg
    className={className}
      width="41"
      height="45"
      viewBox="0 0 41 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.757845 33.75C2.30876 36.4417 5.74819 37.3665 8.43992 35.8156C8.44177 35.8146 8.44353 35.8135 8.44537 35.8124L9.27972 35.3305C10.8547 36.6781 12.6651 37.7231 14.6197 38.413V39.375C14.6197 42.4816 17.1381 45 20.2447 45C23.3513 45 25.8697 42.4816 25.8697 39.375V38.4131C27.8246 37.722 29.635 36.6758 31.2097 35.3268L32.0478 35.8106C34.7401 37.3639 38.182 36.4405 39.7353 33.7481C41.2886 31.0557 40.3652 27.6138 37.6728 26.0605L36.8403 25.5806C37.2151 23.5414 37.2151 21.451 36.8403 19.4118L37.6728 18.9318C40.3651 17.3785 41.2886 13.9367 39.7353 11.2443C38.182 8.55193 34.7402 7.62847 32.0478 9.18176L31.2134 9.66366C29.6369 8.31779 27.8253 7.27471 25.8697 6.58687V5.625C25.8697 2.51842 23.3513 0 20.2447 0C17.1381 0 14.6197 2.51842 14.6197 5.625V6.58687C12.6648 7.27796 10.8544 8.32421 9.27972 9.67315L8.44159 9.18756C5.74915 7.63418 2.30736 8.55765 0.754065 11.25C-0.799226 13.9424 0.124153 17.3842 2.81659 18.9375L3.64909 19.4175C3.27433 21.4566 3.27433 23.547 3.64909 25.5863L2.81659 26.0662C0.131624 27.6237 -0.788767 31.0588 0.757845 33.75ZM20.2447 15C24.3868 15 27.7447 18.3579 27.7447 22.5C27.7447 26.6421 24.3868 30 20.2447 30C16.1026 30 12.7447 26.6421 12.7447 22.5C12.7447 18.3579 16.1026 15 20.2447 15Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default ConfiguracionesIcon;