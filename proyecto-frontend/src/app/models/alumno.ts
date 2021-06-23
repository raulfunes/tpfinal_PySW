import { Persona } from "./persona";
import { Plan } from "./plan";

export class Alumno{
    _id : String;
    persona: Persona;
    plan: Plan;
    dias_restantes: number;
    fecha_inicio: String;

    constructor(_id?:string, persona?:Persona, plan?:Plan, dias_restantes?:number, fecha_inicio?:String){
        this._id = _id;
        this.persona = persona;
        this.plan = plan;
        this.dias_restantes = dias_restantes;
        this.fecha_inicio = fecha_inicio;
    }
}
