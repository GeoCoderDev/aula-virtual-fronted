export interface Student {
    DNI_Estudiante: string;
    Id_Aula: number;
    Nombres: string;
    Apellidos: string;
    Fecha_Nacimiento: string; // Puedes cambiar el tipo según el formato de fecha utilizado en tu base de datos
    Nombre_Usuario: string;
    Contraseña_Usuario?: string;
    Direccion_Domicilio: string;
    Nombre_Contacto_Emergencia: string;
    Parentezco_Contacto_Emergencia: string;
    Telefono_Contacto_Emergencia: string;
    Foto_Perfil_Key_S3: string;
    Grado: string;
    Seccion: string;
}