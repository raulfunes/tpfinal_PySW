import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {
    _id: String;
    username: string;
    password: string;
    persona: Persona;
    rol: Rol;
}
