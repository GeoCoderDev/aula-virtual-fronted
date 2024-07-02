import useAPI from "@/app/hooks/useAPI";
import { Aula } from "@/interfaces/Aula";
import React, {
  ChangeEventHandler,
  Dispatch,
  LegacyRef,
  MutableRefObject,
  SetStateAction,
  useState,
} from "react";

const AulaSelector = ({
  className = "",
  tipo,
  contenedor = false,
  form,
  setForm,
  searchTerms,
  setSearchTerms,
  selectGrado,
  selectSeccion,
}: {
  tipo: "search" | "register";
  contenedor?: boolean;
  searchTerms?: Aula;
  setSearchTerms?: Dispatch<SetStateAction<Aula>>;
  className?: string;
  form?: Aula;
  setForm?: Dispatch<SetStateAction<Aula>>;
  selectGrado: MutableRefObject<HTMLSelectElement | undefined>;
  selectSeccion?: MutableRefObject<HTMLSelectElement | undefined>;
}) => {
  const [availableSections, setAvailableSections] = useState([]);

  const { fetchAPI } = useAPI();

  const handleGradoSelectChange: ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    if (tipo === "register") {
      setForm!({
        ...searchTerms!,
        [e.target.name]: e.target.value,
        Seccion: "",
      });
    } else {
      setSearchTerms!({
        ...searchTerms!,
        [e.target.name]: e.target.value,
        Seccion: "",
      });
    }

    setAvailableSections([]);
    if (e.target.value === "") {
      setAvailableSections([]);
    } else {
      const fetchCancelable = fetchAPI(
        `/api/classrooms/grade/${e.target.value}/sections`
      );

      if (fetchCancelable === undefined) return;

      const res = await fetchCancelable.fetch();

      if (fetchCancelable?.queryParams?.Grado === selectGrado?.current?.value)
        return setAvailableSections([]);

      const sections = await res?.json();
      setAvailableSections(sections ?? []);
    }
  };

  const handleSectionSelectChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    if (tipo === "register") {
      setForm!({ ...form!, [e.target.name]: e.target.value });
    } else {
      setSearchTerms!({ ...searchTerms!, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className={`flex gap-4 ${!contenedor && "contents"} ${className}`}>
        {tipo === "register" ? (
          <>
            <label className="flex flex-col gap-y-2 font-bold">
              Grado:
              <select
                ref={selectGrado as React.LegacyRef<HTMLSelectElement>}
                className="custom-input w-max px-3 text-center"
                name="Grado"
                required
                value={form!.Grado}
                onChange={handleGradoSelectChange}
              >
                <option disabled value={""}>
                  - seleccione -
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <label className="flex flex-col gap-y-2 font-bold">
              Sección:
              <select
                required
                value={form!.Seccion}
                className="custom-input w-max px-3 text-center"
                name="Seccion"
                disabled={availableSections.length === 0}
                onChange={handleSectionSelectChange}
              >
                <option disabled value="">
                  - seleccione -
                </option>
                {availableSections.map((section, index) => (
                  <option value={section} key={index}>
                    {section}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : (
          <>
            <select
              ref={selectGrado as LegacyRef<HTMLSelectElement>}
              name="Grado"
              value={searchTerms!.Grado}
              onChange={handleGradoSelectChange}
              className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
            >
              <option value="">GRADO</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <select
              ref={selectSeccion as LegacyRef<HTMLSelectElement>}
              name="Seccion"
              value={searchTerms!.Seccion}
              onChange={handleSectionSelectChange}
              disabled={availableSections.length === 0}
              className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
            >
              <option value="">SECCIÓN</option>
              {availableSections.map((section, index) => (
                <option value={section} key={index}>
                  {section}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </>
  );
};

export default AulaSelector;
