import { Persona } from "./persona";
import { Plan } from "./plan";

export class Alumno{
    _id : String;
    persona: Persona;
    plan: Plan;
    fecha_inicio: String;

    constructor(_id?:string, persona?:Persona, plan?:Plan, fecha_inicio?:String){
        this._id = _id;
        this.persona = persona;
        this.plan = plan;
        this.fecha_inicio = fecha_inicio;
    }
}
