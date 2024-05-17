import { User } from "./User";

export interface Student extends User{
    DNI_Estudiante:                 string;
    Grado:                          string;
    Seccion:                        string;
}
