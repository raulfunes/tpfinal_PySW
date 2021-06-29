import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Rol } from 'src/app/models/rol';
import { AlumnoService } from 'src/app/services/alumno.service';
import { LoginService } from 'src/app/services/login.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  
  //Forms Angular Material
  displayedColumns: string[] = ['nombre', 'apellido', 'plan', 'fecha_inicio', 'detalles', 'modificar', 'usuario'];
  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Validaciones
  autenticacion: boolean = true;
  ready: boolean = true;
  filtro: string;

  //Contenedores
  alumnos: Array<Alumno>;

  constructor(private alumnoService: AlumnoService,
    private route: Router,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private rolService: RolService,
    public dialog: MatDialog) {
    this.listAlumnos();
    this.comprobarRol();
  }


  ngOnInit(): void {
  }


  /**
   * Llena con alumnos con la lista de alumnos del gimnasio
   */
  listAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      (result) => {
        if (result.length > 1){
          this.alumnos = new Array<Alumno>();
          result.forEach(element => {
          let oAlumno = new Alumno();
          Object.assign(oAlumno, element);
          this.alumnos.push(oAlumno);
          })
        }
        this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = function (data: any, filterValue: string) {
          let case_one = data.persona.nombre.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 ||
            data.persona.apellido.trim().toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
          return case_one
        };
        this.ready = true;
      }
    )
  }


  /**
   * Encuntra el rol con el que esta logeado el usuario para mostrar el formulario
   */
  comprobarRol() {
    if (this.loginService.rolLogged() == null){
      this.autenticacion = false;
    }
    this.rolService.getRol(this.loginService.rolLogged()).subscribe(
      (result) => {
        console.log(result);
        let rol = new Rol();
        Object.assign(rol, result);
        console.log(rol);
        if (rol.descripcion != "Entrenador") {
          this.autenticacion = false;
        }
      }
    )
  }

  /**
   * Filtra por el texto ingresado los alumnos
   * @param text Filtro String
   */
  applyFilter(text: String) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  /**
   * Muestra los detalles del alumno y la opcion de obtener Asistencia
   * @param alumno Alumno
   */
  redirectToDetails(alumno: Alumno) {
    Swal.fire({
      title: '<strong>' + alumno.persona.apellido + ', ' + alumno.persona.nombre + '</strong>',
      icon: 'info',
      html:
        'ID: <b>' + alumno._id + '</b> <br>' +
        'DNI: <b>' + alumno.persona.dni + '</b> <br>' +
        'Email: <b>' + alumno.persona.email + '</b> <br>' +
        'Celular: <b>' + alumno.persona.celular + '</b> <br>' +
        'Direccion: <b>' + alumno.persona.domicilio + '</b> <br>' +
        'Fecha de Nacimiento: <b>' + alumno.persona.fecha_nac + '</b> <br>' +
        'Plan: <b>' + alumno.plan.nombre + '</b> <br>',
      showCloseButton: true,
      showConfirmButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ir a asistencia',
      preConfirm: () => [this.redirectToAssistance(alumno._id)],
      confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }

  /**
   * Redirecciona a la Asistencia del alumno seleccionado
   * @param id String Alumno_id
   */
  redirectToAssistance(id: String) {
    console.log("Asistencia");
    console.log(id)
    this.route.navigate(["asistencia/", id]);
  }


  /**
   * Redirecciona a la Modificacion del alumno seleccionado
   * @param id String Alumno _id
   */
  redirectToUpdate(id: String) {
    this.route.navigate(["alumno-form/", id]);
  }

  /**
   * Redirecciona a la creacion de Usuarios con el alumno seleccionado
   * @param id_persona String Persona_id
   */
  redirectToUser(id_persona: String) {
    this.usuarioService.getUsuario(id_persona).subscribe(
      (result) => {
        if (result != null) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Usuario existente',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            title: 'Usuario no Existe',
            text: "¿Desea crear un usuario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear Usuario'
          }).then((result) => {
            if (result.isConfirmed) {               
              const dialogRef = this.dialog.open(SignupComponent, {
              width: '500px',
              data: {
                persona: id_persona,
              }
            });
            dialogRef.afterClosed().subscribe(res => {

            }) 
          }
          })
        }
      }
    )
  }

  /**
   * Formatea la fecha en formato dd/MM/YYYY
   * @param a Date Sin Formato
   * @returns String Date Formateado
   */
  verAsistencia(a: Date): String {
    let d = new Date(a);
    return d.toLocaleDateString();
  }
}
