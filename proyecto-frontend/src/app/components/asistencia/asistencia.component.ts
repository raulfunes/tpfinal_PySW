import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Rol } from 'src/app/models/rol';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';
import { RolService } from 'src/app/services/rol.service';
import { RutinaService } from 'src/app/services/rutina.service';
import Swal from 'sweetalert2';
import { RutinaFormComponent } from '../gestion/rutina-form/rutina-form.component';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  //Forms Angular Material
  displayedColumns: string[] = ['fecha', 'rutina'];
  dataSource: MatTableDataSource<Asistencia>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Validaciones 
  autenticacion: boolean = true;
  ready: boolean = false;

  //Contenedores
  asistencias: Array<Asistencia>;
  filtro: string;
  persona_id: String;
  asistencia: Asistencia;
  date: Date = new Date();
  alumno: Alumno = new Alumno();

  constructor(private activatedRoute: ActivatedRoute,
    private asistenciaService: AsistenciaService,
    private route: Router,
    private rutinaService: RutinaService,
    private alumnoService: AlumnoService,
    private loginService: LoginService,
    private rolService: RolService,
    public dialog: MatDialog,
    private pagoService:PagoService) {
    this.comprobarRol()
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.getAlumno(params.id);
        this.listAsistencia(params.id);
      })
  }


  /**
   * Encuntra el rol con el que esta logeado el usuario para mostrar el formulario
   */
  comprobarRol() {
    if (this.loginService.rolLogged() == null) {
      this.autenticacion = false;
    }
    this.rolService.getRol(this.loginService.rolLogged()).subscribe(
      (result) => {
        let rol = new Rol();
        Object.assign(rol, result);
        if (rol.descripcion != "Entrenador") {
          this.autenticacion = false;
        }
      }
    )
  }


  /**
   * Trae el alumno del cual se quiere ver la asistencia
   * @param alumno String ID Alumno
   */
  getAlumno(alumno: String) {
    this.alumnoService.getAlumno(alumno).subscribe(
      (result) => {
        this.alumno = new Alumno();
        Object.assign(this.alumno, result)
        this.comprobarVencimiento();
        this.ready = true
      }
    )
  }



  /**
   * Lista las asistencias que tiene el usuario
   * @param alumno String ID Alumno
   */
  listAsistencia(alumno: String) {
    this.asistenciaService.getAsistenciaAlumno(alumno).subscribe(
      (result) => {
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
        this.ready = true
      }
    )
  }



  applyFilter(text: String) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }


  /**
   * Marcar la asistencia con el dia de la fecha
   */
  marcarAsistencia() {
    if (this.alumno.dias_restantes > 0) {
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
        this.asistencia.fecha = this.date;
        this.asistencia.rutina = "0";
        if (result.isConfirmed) {
          this.asistenciaService.postAsistencia(this.asistencia).subscribe(
            (result) => {
              if (result.status == "1") {
                this.listAsistencia(this.persona_id);
                this.alumno.dias_restantes = this.alumno.dias_restantes - 1
                this.alumnoService.modificarAlumno(this.alumno).subscribe(
                  (result2) => {
                  }
                )
              } else {
              }

            }
          )
          Swal.fire(
            'Se marco la asistencia'
          )
        }
      })
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'El alumno no dispone de mas clases',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  /**
   * Se agrega una rutina a la asistencia elegida
   * @param asistencia Asistencia a Asignar Rutina
   */
  asignarRutina(asistencia: Asistencia) {
    this.rutinaService.getRutinaAsistencia(asistencia._id).subscribe(
      (result) => {
        if (result.length == 0) {
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
              const dialogRef = this.dialog.open(RutinaFormComponent, {
                width: '700px',
                data: {
                  asistencia_id: asistencia._id,
                }
              });
              dialogRef.afterClosed().subscribe(res => {
                this.listAsistencia(this.alumno._id);
              })
            }
          })
        }
        else {
          console.log(result);
        }
      }
    )
  }


  /**
   * 
   * @param asistencia Asistencia a la cual se quiere modifica
   */
  modificarRutina(asistencia: Asistencia) {
    this.rutinaService.getRutinaAsistencia(asistencia._id).subscribe(
      (result) => {
        console.log(result);
        if (result.length == 1) {
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
              const dialogRef = this.dialog.open(RutinaFormComponent, {
                width: '700px',
                data: {
                  asistencia_id: asistencia._id,
                }
              });
              dialogRef.afterClosed().subscribe(res => {
                this.listAsistencia(this.alumno._id);
              })
            }
          })
        }
        else {
          console.log(result);
        }
      }
    )

  }


  /**
   * Devuelve la fecha con formato dd/MM/YY
   * @param a Asistencia Para sacar su fecha
   * @returns String Fecha con Formato
   */
  verAsistencia(a: Asistencia): String {
    let d = new Date(a.fecha);
    return d.toLocaleDateString();
  }

  comprobarVencimiento(){
    this.pagoService.getUltimoPagoAlumno(this.alumno._id).subscribe(
      (result)=>{
        if(result.status == "1"){
          var ultimo_pago = new Date(result.ultimo_pago)
          var fecha_hoy = new Date()
          var dias = this.restarFechas(ultimo_pago, fecha_hoy)
          if(dias > 30 && this.alumno.dias_restantes > 0){
            this.alumno.dias_restantes = 0;
            this.alumnoService.modificarAlumno(this.alumno).subscribe(
              (result)=>{
                Swal.fire({
                  position: 'top-end',
                  icon: 'warning',
                  title: 'Las clases del alumno se vencieron',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            )
          }
        }
      }
    )
  }

  restarFechas(f1: Date, f2: Date) {
    var aFecha1 = f1.toLocaleString().split('/');
    var aFecha2 = f2.toLocaleString().split('/');
    var fFecha1 = Date.UTC( parseInt(aFecha1[2]) , parseInt(aFecha1[1]) - 1, parseInt(aFecha1[0]));
    var fFecha2 = Date.UTC( parseInt(aFecha2[2]) , parseInt(aFecha2[1]) - 1, parseInt(aFecha2[0]));
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    console.log(dias)
    return dias;
  }

}
