import React from "react";

const SectionElement = ({ section }: { section: string }) => {
  return (
    <div

      className="text-white bg-verde-spotify rounded-[0.5rem] py-2 px-4 font-semibold text-[0.9rem] "
    >
      {section}
    </div>
  );
};

export default SectionElement;
