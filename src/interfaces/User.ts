export interface User {
    Id_Usuario:                     number;
    Nombres:                        string;
    Apellidos:                      string;
    Fecha_Nacimiento:               Date;
    Nombre_Usuario:                 string;  
    Telefono:                       string;
    Direccion_Domicilio:            string;
    Nombre_Contacto_Emergencia:     string;
    Parentezco_Contacto_Emergencia: string;
    Telefono_Contacto_Emergencia:   string;
    Foto_Perfil_Key_S3:             string;
    Estado:                         number;
    Foto_Perfil_URL?:               string;
}