import React from "react";
import ModalContainer from "../../ModalContainer";

const ChangeAcademicTime= ({eliminateModal}:{eliminateModal: ()=>void}) => {
    return (
        <ModalContainer eliminateModal={()=>{
            eliminateModal();
        }}>
        <div>
        <form className="flex flex-col gap-y-3 items-left justify-center">
        <h4 className="text-[1.5rem] font-semibold">Días de la semana</h4>
    
        <div className="flex justify-center items-center gap-x-2">
        <label className="flex items-center gap-x-2">
            <input 
            type="number" 
            className="border border-black rounded px-2 py-1 w-16 text-center"
            min="0"
            />
            Minutos
        </label>
        </div>

        

                <button
                    className="button-with-loader mt-3"
                   
                    type="submit"
                    >
                    GUARDAR CAMBIOS

                </button>
            </form>
            </div>
        </ModalContainer>
    )
}
export default ChangeAcademicTime