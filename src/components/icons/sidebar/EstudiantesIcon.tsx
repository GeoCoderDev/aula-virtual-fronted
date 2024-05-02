import { IconProps } from "../icon.interface";

const EstudiantesIcon = ( {className, fillColor} : IconProps ) => {
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
        d="M12.1875 41.25V45H0V41.25C0 39.1781 1.67812 37.5 3.75 37.5H8.4375C10.5094 37.5 12.1875 39.1781 12.1875 41.25ZM41.25 37.5H36.5625C34.4906 37.5 32.8125 39.1781 32.8125 41.25V45H45V41.25C45 39.1781 43.3219 37.5 41.25 37.5ZM25.3125 37.5H19.6875C17.6156 37.5 15.9375 39.1781 15.9375 41.25V45H29.0625V41.25C29.0625 39.1781 27.3844 37.5 25.3125 37.5ZM38.9419 35.625C41.5312 35.625 43.6294 33.5269 43.6294 30.9375C43.6294 28.3481 41.5312 26.25 38.9419 26.25C36.3525 26.25 34.2544 28.3481 34.2544 30.9375C34.2544 33.5269 36.3525 35.625 38.9419 35.625ZM22.5 35.625C25.0894 35.625 27.1875 33.5269 27.1875 30.9375C27.1875 28.3481 25.0894 26.25 22.5 26.25C19.9106 26.25 17.8125 28.3481 17.8125 30.9375C17.8125 33.5269 19.9106 35.625 22.5 35.625ZM6.05812 35.625C8.6475 35.625 10.7456 33.5269 10.7456 30.9375C10.7456 28.3481 8.6475 26.25 6.05812 26.25C3.46875 26.25 1.37062 28.3481 1.37062 30.9375C1.37062 33.5269 3.46875 35.625 6.05812 35.625ZM6.05812 22.5C10.0762 22.5 13.4344 25.3275 14.28 29.0944C15.1256 25.3275 18.4837 22.5 22.5019 22.5C26.52 22.5 29.8781 25.3275 30.7237 29.0944C31.5694 25.3275 34.9275 22.5 38.9456 22.5C41.325 22.5 43.4681 23.4994 45.0037 25.0894V5.625C45.0037 2.52375 42.48 0 39.3787 0H5.625C2.52375 0 0 2.52375 0 5.625V25.0894C1.53562 23.4994 3.67875 22.5 6.05812 22.5Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default EstudiantesIcon;
