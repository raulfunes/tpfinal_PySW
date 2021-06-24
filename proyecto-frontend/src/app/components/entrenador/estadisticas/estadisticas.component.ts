import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Pago } from 'src/app/models/pago';
import { AlumnoService } from 'src/app/services/alumno.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
    _auxiliarAlumno: Alumno;
    _alumnos: Array<Alumno>;
    _pagos: Array<Pago>;
    _verPagos: Array<Pago>;

  constructor(private _alumnoService: AlumnoService, private _pagoService: PagoService) {
    this._auxiliarAlumno = new Alumno();
    this._verPagos = new Array<Pago>();
    this.obtenerAlumno();
    this.obtenerPagos();
  }

  /*Obtener listado de alumos*/
  obtenerAlumno() {
    this._alumnoService.getAlumnos().subscribe(
      (result) => {
        this._alumnos =new Array<Alumno>();
        result.forEach(element => {
          let oAlumno = new Alumno();
          Object.assign(oAlumno, element);
          this._alumnos.push(oAlumno);
        });
      }
    )
  }

  /* Obtener asistencia de acuerdo a  */
  obtenerAsistencias() {

  }

  /* Obtener una listado de pagos */
  obtenerPagos() {
    this._pagoService.getPagos().subscribe(
      (result) => {
        this._pagos = new Array<Pago>();
        result.forEach(element => {
          let oPago = new Pago();
          Object.assign(oPago, element);
          this._pagos.push(oPago);
        });
      }
    )
  }

  auxiliarAlumno(alumno) {
    this._auxiliarAlumno = alumno;
  }

  verPagos(alumno) {
    this._verPagos = new Array<Pago>();
    for (let i in this._pagos) {
      if (this._pagos[i].alumno == alumno._id) {
        this._verPagos.push(this._pagos[i]);
      }
    }
  }

  ngOnInit(): void {
  }

}