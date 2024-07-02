import React from "react";
import ModalContainer from "../../ModalContainer";

const ChangeDay= ({eliminateModal}:{eliminateModal: ()=>void}) => {
    return (
        <ModalContainer eliminateModal={()=>{
            eliminateModal();
        }}>
        <div>
        <form className="flex flex-col gap-y-3 items-left justify-center">
        <h4 className="text-[1.5rem] font-semibold">Días de la semana</h4>
        
        <div className="flex flex-col space-y-4 text-xl">
        <div className="flex justify-between items-center">
            <label className="mr-2">Lunes:</label>
            <input type="checkbox" className="h-8 w-8"/>
        </div>
        <div className="flex justify-between items-center">
            <label className="mr-2">Martes:</label>
            <input type="checkbox" className="h-8 w-8"/>
        </div>
        <div className="flex justify-between items-center">
            <label className="mr-2">Miércoles:</label>
            <input type="checkbox" className="h-8 w-8"/>
        </div>
        <div className="flex justify-between items-center">
            <label className="mr-2">Jueves:</label>
            <input type="checkbox" className="h-8 w-8"/>
        </div>
        <div className="flex justify-between items-center">
            <label className="mr-2">Viernes:</label>
            <input type="checkbox" className="h-8 w-8"/>
        </div>
        <div className="flex justify-between items-center">
            <label className="mr-2">Sábado:</label>
            <input type="checkbox" className="h-8 w-8"/>
        </div>
        <div className="flex justify-between items-center">
            <label className="mr-2">Domingo:</label>
            <input type="checkbox" className="h-8 w-8"/>
        </div>
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
export default ChangeDay