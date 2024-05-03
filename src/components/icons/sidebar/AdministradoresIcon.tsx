import { IconProps } from "../icon.interface";
const AdministradoresIcon = ({ className, fillColor }: IconProps) => {
  return (
    <svg
    className={className}
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5199 22.5C21.9393 22.5 27.1598 17.4544 27.1598 11.25C27.1598 5.04562 21.9393 0 15.5199 0C9.10048 0 3.87998 5.04562 3.87998 11.25C3.87998 17.4544 9.10048 22.5 15.5199 22.5ZM44.03 35.8763L42.1404 34.8225C42.4625 33.8906 42.6797 32.9119 42.6797 31.875C42.6797 30.8381 42.4644 29.8594 42.1404 28.9275L44.03 27.8738C44.9573 27.3563 45.2754 26.2087 44.74 25.3125C44.2026 24.4144 43.0173 24.1069 42.09 24.6262L40.2024 25.68C38.8347 24.1913 37.013 23.1019 34.9198 22.6912V20.6269C34.9198 19.5919 34.0507 18.7519 32.9798 18.7519C31.9089 18.7519 31.0398 19.5919 31.0398 20.6269V22.6912C28.9466 23.1037 27.1249 24.1931 25.7572 25.68L23.8696 24.6262C22.9365 24.1069 21.755 24.4144 21.2196 25.3125C20.6842 26.2106 21.0023 27.3563 21.9296 27.8738L23.8192 28.9275C23.4971 29.8594 23.2799 30.8381 23.2799 31.875C23.2799 32.9119 23.4952 33.8906 23.8192 34.8225L21.9296 35.8763C21.0023 36.3938 20.6842 37.5413 21.2196 38.4375C21.5804 39.0394 22.2303 39.375 22.9016 39.375C23.2294 39.375 23.5631 39.2944 23.8696 39.1237L25.7572 38.07C27.1249 39.5587 28.9466 40.6481 31.0398 41.0588V43.1231C31.0398 44.1581 31.9089 44.9981 32.9798 44.9981C34.0507 44.9981 34.9198 44.1581 34.9198 43.1231V41.0588C37.013 40.6463 38.8347 39.5569 40.2024 38.07L42.09 39.1237C42.3965 39.2944 42.7302 39.375 43.058 39.375C43.7293 39.375 44.3811 39.0394 44.74 38.4375C45.2754 37.5394 44.9573 36.3938 44.03 35.8763ZM32.9798 34.6875C31.3754 34.6875 30.0698 33.4256 30.0698 31.875C30.0698 30.3244 31.3754 29.0625 32.9798 29.0625C34.5842 29.0625 35.8898 30.3244 35.8898 31.875C35.8898 33.4256 34.5842 34.6875 32.9798 34.6875ZM16.4899 31.875C16.4899 30.8456 16.5966 29.8013 16.81 28.7663C16.938 28.1419 16.7285 27.4988 16.2571 27.0563C15.7857 26.6138 15.1144 26.4338 14.4723 26.5744C6.22154 28.4044 0 35.52 0 43.125C0 44.16 0.869115 45 1.93999 45H18.6957C19.4445 45 20.1274 44.5837 20.4475 43.9294C20.7695 43.275 20.6725 42.5006 20.1992 41.94C17.8071 39.1069 16.4899 35.5331 16.4899 31.875Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default AdministradoresIcon;
