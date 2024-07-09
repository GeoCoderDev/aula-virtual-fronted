import React from "react";
import { IconProps } from "../icon.interface";

const DoubleChevronIcon = ({
  className,
  fillColor = "black",
  title,
}: IconProps) => {
  return (
    <div title={title ?? ""}>
      <svg
        viewBox="0 0 12 15"
        className={`${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.23207 9.02127C0.993847 9.09479 0.810772 9.27742 0.735778 9.51697C0.685046 9.68063 0.700486 9.95813 0.768863 10.1052C0.832829 10.2427 4.53624 14.2392 4.79431 14.4479C5.08988 14.6899 5.4847 14.8796 5.85968 14.9603C6.11554 15.0148 6.62506 15.0124 6.86107 14.9579C7.24046 14.8701 7.62867 14.6875 7.90659 14.4645C7.99261 14.3981 8.92122 13.4186 9.97335 12.2896C12.135 9.96762 11.9982 10.1408 11.9982 9.76127C11.9982 9.58576 11.9894 9.52646 11.9453 9.42922C11.8769 9.27505 11.7512 9.14223 11.6012 9.06396C11.4997 9.01178 11.4512 9.00229 11.2924 9.00229C11.1314 9.00467 11.0872 9.01415 10.9836 9.07108C10.8843 9.12563 10.5049 9.51935 8.94328 11.1962C7.07282 13.2004 7.01989 13.2573 6.85887 13.3379C6.48831 13.5253 6.08687 13.504 5.74498 13.2786C5.67881 13.2336 4.86931 12.3821 3.72674 11.1583C2.18494 9.50511 1.79894 9.10191 1.71512 9.06159C1.58278 8.99992 1.36441 8.98095 1.23207 9.02127Z"
          fill={fillColor}
        />
        <path
          d="M11.4737 5.97873C11.7119 5.90521 11.895 5.72258 11.97 5.48303C12.0207 5.31937 12.0053 5.04187 11.9369 4.89482C11.8729 4.75726 8.1695 0.760774 7.91143 0.552056C7.61587 0.310132 7.22104 0.120388 6.84607 0.039747C6.5902 -0.0148044 6.08068 -0.0124326 5.84467 0.0421188C5.46528 0.129875 5.07708 0.312504 4.79915 0.535453C4.71313 0.601863 3.78452 1.58142 2.73239 2.71039C0.570781 5.03238 0.707536 4.85924 0.707536 5.23873C0.707536 5.41424 0.716359 5.47354 0.760473 5.57078C0.828851 5.72495 0.954577 5.85777 1.10457 5.93604C1.20603 5.98822 1.25456 5.99771 1.41337 5.99771C1.57439 5.99533 1.6185 5.98585 1.72217 5.92892C1.82143 5.87437 2.20081 5.48065 3.76246 3.80379C5.63292 1.79962 5.68586 1.7427 5.84687 1.66206C6.21744 1.47469 6.61888 1.49603 6.96076 1.72135C7.02694 1.76642 7.83644 2.61789 8.979 3.84174C10.5208 5.49489 10.9068 5.89809 10.9906 5.93841C11.123 6.00008 11.3413 6.01905 11.4737 5.97873Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default DoubleChevronIcon;