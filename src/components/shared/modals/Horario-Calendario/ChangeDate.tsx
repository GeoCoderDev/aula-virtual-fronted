import React from "react";
import ModalContainer from "../../ModalContainer";

const ChangeDate = ({ eliminateModal }: { eliminateModal: () => void }) => {
    return (
        <ModalContainer eliminateModal={() => {
            eliminateModal();
        }}>
            <form className="flex flex-col gap-y-4 items-center justify-center w-full max-w-md px-4">
                <h4 className="text-xl sm:text-2xl font-semibold text-center mb-2">Cambiar Fechas del Año Escolar</h4>

                <div className="flex flex-col sm:flex-row justify-between items-cemter gap-4 w-full">
                    <div className="flex flex-col items-center w-full sm:w-1/2">
                        <label className="font-semibold text-sm sm:text-base mb-2">
                            Inicio de año:
                        </label>
                        <input type="date" className="custom-input2 w-full" />
                    </div>
                    <div className="flex flex-col items-center w-full sm:w-1/2">
                        <label className="font-semibold text-sm sm:text-base mb-2">
                            Fin de año:
                        </label>
                        <input type="date" className="custom-input2 w-full" />
                    </div>
                </div>


                <button
                    className="button-with-loader mt-4 w-full sm:w-auto"

                    type="submit"
                >
                    GUARDAR CAMBIOS

                </button>
            </form>
        </ModalContainer>
    )
}
export default ChangeDate