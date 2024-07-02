import React from "react";
import ModalContainer from "../../ModalContainer";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import Loader from "../../Loader";



const ChangeDayBackup = ({eliminateModal}:{eliminateModal: ()=>void}) => {
    return (
        <ModalContainer eliminateModal={()=>{
            eliminateModal();
        }}>
        <form className="flex flex-col gap-y-3 items-center justify-center">
            <h4 className="text-[1.5rem] font-semibold">Frecuencia de backup</h4>
                <label className="flex items-center gap-x-2">
                    Cada:
                        <input 
                        type="number" 
                        className="border rounded px-2 py-1 w-16 text-center"
                        min="0"
                        />
                    Días y
                        <input 
                        type="number" 
                        className="border rounded px-2 py-1 w-16 text-center"
                        min="0"
                        />
                    Horas
                </label>
            

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
export default ChangeDayBackup