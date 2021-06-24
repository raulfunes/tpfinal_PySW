import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit{
  displayedColumns: string[] = ['nombre','apellido','plan','fecha_inicio', 'detalles', 'modificar', 'eliminar'];
  alumnos:Array<Alumno>;
  ready:boolean = true;
  filtro: string;
  dataSource: MatTableDataSource<Alumno>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private alumnoService:AlumnoService, private route:Router) { 
    this.listAlumnos();
  }


  ngOnInit(): void {
    
  }


  listAlumnos(){
    this.alumnoService.getAlumnos().subscribe(
      (result)=>{
        this.alumnos = new Array<Alumno>();
        result.forEach(element => {
          let oAlumno = new Alumno();
          Object.assign(oAlumno, element);
          this.alumnos.push(oAlumno);
        });
        this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = function(data: any, filterValue: string) {
          let case_one = data.persona.nombre.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0  ||
          data.persona.apellido.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
          return case_one
        };

        this.ready = true;
      }
    )
  }

  
  applyFilter(text: String){
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  redirectToDetails(alumno: Alumno){
    Swal.fire({
      title: '<strong>'+ alumno.persona.apellido +', '+ alumno.persona.nombre +'</strong>',
      icon: 'info',
      html:
        'ID: <b>'+alumno._id+'</b> <br>' +
        'DNI: <b>'+alumno.persona.dni+'</b> <br>'+
        'Email: <b>'+alumno.persona.email+'</b> <br>'+
        'Celular: <b>'+alumno.persona.celular+'</b> <br>'+
        'Direccion: <b>'+alumno.persona.domicilio+'</b> <br>'+
        'Fecha de Nacimiento: <b>'+alumno.persona.fecha_nac+'</b> <br>'+
        'Plan: <b>'+alumno.plan.nombre+'</b> <br>',
      showCloseButton: true,
      showConfirmButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ir a asistencia',
      preConfirm: ()=> [this.redirectToAssistance(alumno._id)],
      confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }

  redirectToAssistance(id : String){
    console.log("Asistencia");
    console.log(id)
    this.route.navigate(["asistencia/",id]);
  }

  redirectToUpdate(id: String){
    this.route.navigate(["alumno-form/",id]);
  }

  
  verAsistencia(a: Date): String{
    let d = new Date(a);
    return d.toLocaleDateString();
  }
}
