import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Pago } from 'src/app/models/pago';

import { AlumnoService } from 'src/app/services/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  displayedColumns: string[] = ['apellido', 'nombre', 'plan', 'fecha_inicio', 'pagos', 'asistencias'];
  _displayedColumnsPago: string[] = ['fecha_pago', 'monto', 'modo_pago'];
  _displayedColumnsAsistencia: string[] = ['fecha'];

  _alumnos: Array<Alumno>;
  _pagos: Array<Pago>;
  _verPagos: Array<Pago>;
  _verAsistencias: Array<Asistencia>;
  _diasRestantes: number = 0;

  _dataSource: MatTableDataSource<Alumno>;
  _dataSourcePago: MatTableDataSource<Pago>;
  _dataSourceAsistencia: MatTableDataSource<Asistencia>;

  ready: boolean = true;
  readyPago: boolean = true;
  readyAsistencia: boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _alumnoService: AlumnoService, private _pagoService: PagoService, private _asistenciaService: AsistenciaService) {
    this._verPagos = new Array<Pago>();
    this._verAsistencias = new Array<Asistencia>();
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

        this._dataSource = new MatTableDataSource<Alumno>(this._alumnos);
        this._dataSource.sort = this.sort;
        this._dataSource.paginator = this.paginator;
        this._dataSource.filterPredicate = function(data: any, filterValue: string) {
          let case_one = data.persona.nombre.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 || data.persona.apellido.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >=0;
          return case_one
        };
        this.ready = true;
      }
    )
  }

  /* Obtener asistencia de acuerdo a  */
  obtenerAsistencias(alumno) {
    console.log(alumno);
    this._diasRestantes = alumno.dias_restantes;
    this._asistenciaService.getAsistenciaAlumno(alumno._id).subscribe(
      (result) => {
        this._verAsistencias = new Array<Asistencia>();
        result.forEach(element => {
          let oAsistencia = new Asistencia();
          Object.assign(oAsistencia, element);
          this._verAsistencias.push(oAsistencia);
          console.log(this._verAsistencias);
        });
        this._dataSourceAsistencia = new MatTableDataSource<Asistencia>(this._verAsistencias);
      }
    );
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

  verPagos(alumno) {
    this._verPagos = new Array<Pago>();
    for (let i in this._pagos) {
      if (this._pagos[i].alumno == alumno._id) {
        this._verPagos.push(this._pagos[i]);
      }
    }
    this._dataSourcePago = new MatTableDataSource<Pago>(this._verPagos);
  }
  applyFilter(text: String) {
    this._dataSource.filter = text.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {
  }

}