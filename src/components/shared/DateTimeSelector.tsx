import React from "react";

const DateTimeSelector = () => {
  return (
    <div className="flex gap-4 justify-between items-center text-[0.9rem] flex-wrap w-[60%] min-w-[min(21rem,80vw)]">
      <label className="flex flex-col gap-y-[0.35rem]">
        <i className="font-normal">Fecha:</i>
        <input
          required
          type="date"
          name=""
          id=""
          className="custom-input w-[10rem] py-2 "
        />
      </label>

      <label className="flex flex-col gap-y-[0.35rem]">
        <i className="font-normal">Hora:</i>
        <input required type="datetime-local" className="custom-input w-[9rem] py-2" />
      </label>
    </div>
  );
};

export default DateTimeSelector;
