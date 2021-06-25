import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { RutinaService } from 'src/app/services/rutina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia-alumno',
  templateUrl: './asistencia-alumno.component.html',
  styleUrls: ['./asistencia-alumno.component.css']
})
export class AsistenciaAlumnoComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'rutina'];
  asistencias:Array<Asistencia>;
  filtro: string;
  persona_id: String;
  asistencia: Asistencia;
  date: Date = new Date();
  dataSource: MatTableDataSource<Asistencia>;
  ready: boolean = true;
  alumno: Alumno= new Alumno();


  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor( private activatedRoute: ActivatedRoute, private asistenciaService: AsistenciaService, private route: Router,
    private rutinaService: RutinaService, private alumnoService: AlumnoService) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
          this.getAlumno(params.id);
          this.listAsistencia(params.id);
    })
  }


  getAlumno(alumno: String){
    this.alumnoService.getAlumno(alumno).subscribe(
      (result)=>{
        this.alumno = new Alumno();
        Object.assign(this.alumno, result)
      }
    )
  }
  

  listAsistencia(alumno: String){
    this.asistenciaService.getAsistenciaAlumno(alumno).subscribe(
      (result)=>{
        this.asistencias = new Array<Asistencia>();
        result.forEach(element => {
          let oAsistencia = new Asistencia();
          Object.assign(oAsistencia, element);
          this.asistencias.push(oAsistencia);
        });
        this.persona_id = alumno;
        this.dataSource = new MatTableDataSource<Asistencia>(this.asistencias);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if(this.asistencias.length == 0){
          console.log("No se encontraron datos")
          this.ready = false
        }
      }
    )
  }

  verAsistencia(a: Asistencia): String{
    let d = new Date(a.fecha);
    return d.toLocaleDateString();
  }

  verRutina(a: Asistencia){
    this.route.navigate(['rutina-a/', a._id])
  }

  verRutinaNo(){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'La rutina no esta asignada, avisale al entrenador!',
      showConfirmButton: false,
      timer: 1000
    })
  }

}
