import { IconProps } from "../icon.interface";
const HamburguesaIcon = ({ className, fillColor, title }: IconProps) => {
  return (
    <div title={title}>
      <svg
        className={className}
        width="45"
        height="38"
        viewBox="0 0 45 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="45" height="6.15238" rx="3.07619" fill={fillColor} />
        <rect width="45" height="6.15238" rx="3.07619" fill={fillColor} />
        <rect width="45" height="6.15238" rx="3.07619" fill={fillColor} />
        <rect
          y="15.9238"
          width="45"
          height="6.15238"
          rx="3.07619"
          fill={fillColor}
        />
        <rect
          y="15.9238"
          width="45"
          height="6.15238"
          rx="3.07619"
          fill={fillColor}
        />
        <rect
          y="15.9238"
          width="45"
          height="6.15238"
          rx="3.07619"
          fill={fillColor}
        />
        <rect
          y="31.8474"
          width="45"
          height="6.15238"
          rx="3.07619"
          fill={fillColor}
        />
        <rect
          y="31.8474"
          width="45"
          height="6.15238"
          rx="3.07619"
          fill={fillColor}
        />
        <rect
          y="31.8474"
          width="45"
          height="6.15238"
          rx="3.07619"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default HamburguesaIcon;
