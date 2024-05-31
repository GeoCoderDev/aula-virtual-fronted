import React from "react";
import { IconProps } from "../icon.interface";

const PlusIcon = ({
  className = "",
  fillColor = "#00FF6F",
  onClick,
  title,
}: IconProps) => {
  return (
    <div title={title ?? ""}>
      <svg
        className={className}
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          onClick?.();
        }}
      >
        <path
          d="M12.4279 0.0959816C8.94807 0.725325 6.60453 1.92311 4.27113 4.25777C1.9073 6.61273 0.72031 8.95753 0.101452 12.5103C0.050726 12.8452 0 13.6878 0 14.3983C0 17.3116 0.730455 19.8492 2.26238 22.3158C3.03342 23.5339 4.39287 25.0565 5.32623 25.7468C5.6103 25.9498 5.85378 26.1427 5.88422 26.1833C5.99582 26.3254 7.38571 27.178 8.06544 27.5231C8.83648 27.9089 10.3177 28.457 11.0481 28.6194C12.7627 29.0153 14.8729 29.1067 16.5367 28.8732C17.7237 28.7006 17.886 28.66 19.0121 28.2946C23.4151 26.8431 26.8442 23.4121 28.3051 18.9661C28.6602 17.88 28.7008 17.7176 28.8733 16.53C29.1066 14.8652 29.0153 12.7539 28.6196 11.0384C28.4573 10.3076 27.9095 8.82557 27.5239 8.05412C27.179 7.37403 26.3268 5.98338 26.1848 5.87172C26.1442 5.84127 25.9514 5.58751 25.7485 5.31344C25.5456 5.02922 25.0688 4.50138 24.6833 4.13596C22.4818 1.99416 19.6614 0.593365 16.6483 0.126432C15.6033 -0.0258274 13.2395 -0.0461273 12.4279 0.0959816ZM16.557 9.59703L16.5874 12.4189L19.4078 12.4494L22.218 12.4697V14.4998V16.53L19.4078 16.5503L16.5874 16.5807L16.557 19.4026L16.5367 22.2143H14.5076H12.4786L12.4583 19.3924L12.4279 16.5807L9.61766 16.5503L6.79729 16.53V14.4998V12.4697L9.61766 12.4494L12.4279 12.4189L12.4583 9.59703L12.4786 6.78529H14.5076H16.5367L16.557 9.59703Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default PlusIcon;
