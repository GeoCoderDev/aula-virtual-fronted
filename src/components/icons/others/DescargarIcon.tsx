import React from "react";
import { IconProps } from "../icon.interface";

const DescargarIcon = ({
    className = "",
    fillColor = "white",
    onClick,
    title,
}: IconProps) => {
    return (
        <div title={title ?? ""} onClick={onClick} className={className}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.033,19.011a3.489,3.489,0,0,0,2.475-1.024l3.919-3.919-2.121-2.121-2.782,2.782L13.5,0l-3,0,.024,14.709L7.76,11.947,5.639,14.068l3.919,3.919A3.487,3.487,0,0,0,12.033,19.011Z" fill={fillColor} />
                <path d="M21,16v5H3V16H0v5a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V16Z" fill={fillColor} />
            </svg>
        </div>
    );
};

export default DescargarIcon;
