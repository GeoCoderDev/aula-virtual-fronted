import React from 'react';

interface LoaderProps {
  className?: string;
  width?: string;
  color?: string;
  durationSegundos?: number;
  backgroundSize?: string;
}

const Loader = ({color="#1c00bc", durationSegundos = 1, width = "50px", backgroundSize="12px", className}: LoaderProps) => {


  const gradientColor = `no-repeat radial-gradient(farthest-side, ${color} 92%, #0000)`;

  return (
    <div
      className={`-border-2 aspect-square ${className}`}
      style={{
        width,
        background: `
          ${gradientColor} top,
          ${gradientColor} left,
          ${gradientColor} right,
          ${gradientColor} bottom`,
        backgroundSize: `${backgroundSize} ${backgroundSize}`,
        animation: `points_rotate ${durationSegundos}s infinite`,
      }}
    />
  );
};

export default Loader;