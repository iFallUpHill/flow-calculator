import React from "react";

const Button = ({label='', color='text-white', type='button', bgColors, handleClick=null}) => {
    return(
        <button type={type} className={`w-full mt-4 h-12 px-6 ${color} font-bold transition-colors duration-150 rounded-md focus:shadow-outline ${bgColors}`} onClick={handleClick}>{label}</button>
    )
}

const SlimButton = ({label='', color='text-white', type='button', bgColors, handleClick=null}) => {
    return(
        <button type={type} className={`w-full mt-2 h-8 px-4 ${color} font-bold transition-colors duration-150 rounded-md focus:shadow-outline ${bgColors}`} onClick={handleClick}>{label}</button>
    )
}

export { Button, SlimButton };
