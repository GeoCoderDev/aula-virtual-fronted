import React from 'react';

const CourseCard = () => {
  return (
    <div className="w-64 h-60 rounded-lg  overflow-hidden  bg-gray-100 shadow-xl flex flex-col  border border-transparent hover:border-verde-spotify hover:border-4" >
      <div className="w-full h-41 bg-gray-300 bg-cover bg-center" style={{ backgroundImage: 'url("path/to/your/image.png")' }}></div>
      <div className="p-5 flex justify-between items-end bg-white" style={{ marginTop: 'auto' }} >
        <div className="bg-rojo-orange text-white py-0.5 px-5 rounded font-bold">4to Grado</div>
        <div className="text-lg">Álgebra</div>
      </div>
    </div>
  )
}

export default CourseCard;
