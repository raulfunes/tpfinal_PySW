import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { RutinaService } from 'src/app/services/rutina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'rutina'];
  asistencias:Array<Asistencia>;
  ready:boolean = false;
  filtro: string;
  persona_id: String;
  asistencia: Asistencia;
  date: Date = new Date();
  dataSource: MatTableDataSource<Asistencia>;
  constructor( private activatedRoute: ActivatedRoute, private asistenciaService: AsistenciaService, private route: Router,
    private rutinaService: RutinaService) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
          this.listAsistencia(params.id);
    })
  }


  listAsistencia(alumno: String){
    console.log(alumno);
    this.asistenciaService.getAsistenciaAlumno(alumno).subscribe(
      (result)=>{
        console.log(result)
        this.asistencias = new Array<Asistencia>();
        result.forEach(element => {
          let oAsistencia = new Asistencia();
          Object.assign(oAsistencia, element);
          this.asistencias.push(oAsistencia);
        });
        this.persona_id = alumno;
        this.dataSource = new MatTableDataSource<Asistencia>(this.asistencias);
        this.ready = true;
      }
    )
  }

  
  applyFilter(text: String){
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }


  marcarAsistencia(){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se le marcara la asistencia tambien al alumno",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Marcar Asistencia'
    }).then((result) => {
      this.asistencia = new Asistencia();
      this.asistencia.alumno = this.persona_id;
      this.asistencia.dias_restantes = 2;
      this.asistencia.fecha = this.date;
      this.asistencia.rutina = "0";
      if (result.isConfirmed) {
        this.asistenciaService.postAsistencia(this.asistencia).subscribe(
          (result)=>{
            console.log(result);
            this.listAsistencia(this.persona_id);
          }
        )
        Swal.fire(
          'Se marco la asistencia'
        )
      }
    })
  }

  asignarRutina(asistencia: Asistencia){
    this.rutinaService.getRutinaAsistencia(asistencia._id).subscribe(
      (result)=>{
        if (result.length == 0){
          Swal.fire({
            title: 'Asistencia sin rutina asignada',
            text: "¿Desea asignar una?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Asignar Rutina'
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigate(['rutina-form/' + asistencia._id])
            }
          })
        }
        else{
          console.log(result); 
        }
      }
    )

  }


  modificarRutina(asistencia: Asistencia){
    this.rutinaService.getRutinaAsistencia(asistencia._id).subscribe(
      (result)=>{
        console.log(result);
        if (result.length == 1){
          Swal.fire({
            title: 'Asistencia con rutina asignada',
            text: "¿Desea modificarla?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Modificar Rutina'
          }).then((result) => {
            if (result.isConfirmed) {
              console.log(asistencia.rutina)
              this.route.navigate(['rutina-form/' + asistencia._id])
            }
          })
        }
        else{
          console.log(result);
        }
      }
    )

  }
  

  verAsistencia(a: Asistencia): String{
    let d = new Date(a.fecha);
    return d.toLocaleDateString();
  }
}
