import React from 'react';
import EditarPerfil from '../../editar-perfil/page'; // Ajusta la ruta según sea necesario

const EditarPerfilProfesor = () => {
  return (
    <EditarPerfil nombreUsuario="NOMBRE DEL PROFESOR" tipoUsuario="profesor" />
  );
};

export default EditarPerfilProfesor;
