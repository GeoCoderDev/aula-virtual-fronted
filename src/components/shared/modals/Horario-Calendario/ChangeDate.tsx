import React from "react";
import ModalContainer from "../../ModalContainer";

const ChangeDate= ({eliminateModal}:{eliminateModal: ()=>void}) => {
    return (
        <ModalContainer eliminateModal={()=>{
            eliminateModal();
        }}>
        <form className="flex flex-col gap-y-3 items-left justify-center">
        <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col items-center">
            <label className="font-semibold flex items-center gap-x-2 mb-2">
            Inicio de año:
            </label>
            <input type="date" className="custom-input2" />
        </div>
        <div className="flex flex-col items-center">
            <label className="font-semibold flex items-center gap-x-2 mb-2">
            Fin de año:
            </label>
            <input type="date" className="custom-input2"/>
        </div>
        </div>


                <button
                    className="button-with-loader mt-3"
                   
                    type="submit"
                    >
                    GUARDAR CAMBIOS

                </button>
            </form>
        </ModalContainer>
    )
}
export default ChangeDate