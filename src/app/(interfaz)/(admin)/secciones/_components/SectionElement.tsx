import React from "react";

const SectionElement = ({ section }: { section: string }) => {
  return (
    <div
      style={{
        flexBasis: "20%", // Cada botón ocupa el 30% del ancho
        textAlign: "center",
        margin: "0.1rem 0", // Margen entre botones
      }}
      className="text-white bg-verde-spotify rounded-[0.5rem] py-2 px-4 font-semibold text-[0.9rem]"
    >
      {section}
    </div>
  );
};

export default SectionElement;
