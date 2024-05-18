import React from 'react'

const SuccessMessage = ({message, className=""}:{message:string, className?:string}) => {
  return (
    <div className={`text-verde-spotify ${className} font-bold text-center`}>{message}</div>
  )
}

export default SuccessMessage