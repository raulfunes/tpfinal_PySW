import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Pago } from 'src/app/models/pago';
import { Plan } from 'src/app/models/plan';
import { AlumnoService } from 'src/app/services/alumno.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  _pago: Pago;
  _alumno: Alumno;
  _alumnos: Array<Alumno>;
  _mostrarPlan: boolean = false;
  _plan: Plan;
  _ready: boolean = false;
  constructor(private _pagoService: PagoService, private _alumnoService: AlumnoService) {
    this.obtenerAlumno();
    this._pago = new Pago();
   }

  ngOnInit(): void {
  }
 
  /*Obtener listado de alumos*/
  obtenerAlumno() {
    this._alumnoService.getAlumnos().subscribe(
      (result) => {
        console.log(result);
        this._alumnos =new Array<Alumno>();
        result.forEach(element => {
          let oAlumno = new Alumno();
          Object.assign(oAlumno, element);
          if (oAlumno.dias_restantes == 0) {
            this._alumnos.push(oAlumno);
          }
        }
        );
        if (this._alumnos.length > 0){
          this._ready = true;
        }

      }
    )
  }

  /* Agrega un pago */
  agregarPago() {
    this._pago.fecha_pago = new Date();
    this._pago.plan = this._plan;
    this.asignarAlumno(this._pago.alumno);
    
    this._pagoService.addPago(this._pago).subscribe(
      (result) => {
        this.agregarDiasRestantes();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  /* Modifica los días restantes del alumno */
  agregarDiasRestantes() {
    this._alumno.dias_restantes = this._pago.plan.dias;
    console.log(this._alumno);
    this._alumnoService.modificarAlumno(this._alumno).subscribe(
      (result) => {
        this.limpiarCampos();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  /* Asignar al auxiliar alumno */
  asignarAlumno(id) {
    for (let i in this._alumnos) {
      if (this._alumnos[i]._id == id) {
        this._alumno = this._alumnos[i];
      }
    }
  }

  /* Mostrar informacion del plan */
  mostrarPlan(id) {
    console.log(id);
    for (let i in this._alumnos) {
      if (this._alumnos[i]._id == id) {
        console.log(this._alumnos[i].plan);
        this._plan = this._alumnos[i].plan;
        this._mostrarPlan = true;
      }
    }
  }

  limpiarCampos() {
    this._pago = new Pago();
    this._plan = new Plan();
    this._alumno = new Alumno();
    this._mostrarPlan = false;
  }
}
