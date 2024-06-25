import { IconProps } from "../icon.interface";

const MoreOptionsIcon = ({
  className,
  fillColor = "black",
  onClick,
  title,
  Id,
}: IconProps) => {
  return (
    <div
      title={title}
      onClick={onClick}
      id={Id}
      className="w-6 -border-2 flex justify-center cursor-pointer"
    >
      <svg
        viewBox="0 0 8 33"
        fill="none"
        className={`${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4Z"
          fill={fillColor}
        />
        <path
          d="M8 17C8 19.2091 6.20914 21 4 21C1.79086 21 0 19.2091 0 17C0 14.7909 1.79086 13 4 13C6.20914 13 8 14.7909 8 17Z"
          fill={fillColor}
        />
        <path
          d="M8 29C8 31.2091 6.20914 33 4 33C1.79086 33 0 31.2091 0 29C0 26.7909 1.79086 25 4 25C6.20914 25 8 26.7909 8 29Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default MoreOptionsIcon;
