import { Alumno } from "./alumno";
import { Plan } from "./plan";

export class Pago {
    _id : string;
    monto : number;
    fecha_pago : Date;
    modo_pago : string;
    plan : Plan;
    alumno : Alumno;
    
    constructor(_id?:string, monto?:number, fecha_pago?:Date, modo_pago?:string, plan?:Plan, alumno?:Alumno){
        this._id = _id;
        this.monto = monto;
        this.fecha_pago = fecha_pago;
        this.modo_pago = modo_pago;
        this.plan = plan;
        this.alumno = alumno;
    }

}
