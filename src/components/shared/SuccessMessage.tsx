import React from 'react'

const SuccessMessage = ({message}:{message:string}) => {
  return (
    <div className='text-rojo-orange font-bold text-center'>{message}</div>
  )
}

export default SuccessMessage