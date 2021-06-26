import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia';
import { Ejercicio } from 'src/app/models/ejercicio';
import { Rol } from 'src/app/models/rol';
import { Rutina } from 'src/app/models/rutina';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { LoginService } from 'src/app/services/login.service';
import { RolService } from 'src/app/services/rol.service';
import { RutinaService } from 'src/app/services/rutina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rutina-form',
  templateUrl: './rutina-form.component.html',
  styleUrls: ['./rutina-form.component.css']
})
export class RutinaFormComponent implements OnInit {

  //Forms Angular Material
  displayedColumns: string[] = ['nombre', 'repeticiones', 'series', 'acciones'];
  musculosControl = new FormControl('', Validators.required);
  musculos = ['Pecho', 'Espalda', 'Piernas', 'Biceps', 'Triceps', 'Hombros', "Abdomen"];
  funcionControl = new FormControl('', Validators.required);
  funcion = ["Musculacion", "Cardio", "Zumba", "Yoga"];
  dificultadControl = new FormControl('', Validators.required);
  dificultad = ["Adaptacion", "Facil", "Medio", "Dificil"];
  dataSource: MatTableDataSource<Ejercicio>;
  
  //Validaciones
  ready: boolean;
  autenticacion: boolean = true;
  accion: String;

  //Contenedores
  filtro: string;
  ejercicios: Array<Ejercicio>;
  ejerciciosSeleccionados: Array<Ejercicio>;
  rutina: Rutina = new Rutina();
  asistencia: Asistencia = new Asistencia();


  constructor(private activatedRoute: ActivatedRoute,
    private ejercicioService: EjercicioService,
    private rutinaService: RutinaService,
    private router: Router,
    private asistenciaService: AsistenciaService,
    private loginService: LoginService,
    private rolService: RolService,
    public dialogRef: MatDialogRef<RutinaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){

    this.dataSource = new MatTableDataSource<Ejercicio>();
    this.ejerciciosSeleccionados = new Array<Ejercicio>();
    this.comprobarRol();
    this.load();
  }


  ngOnInit(): void {
  }

  load(){       
    this.asistenciaService.getAsistencia(this.data.asistencia_id).subscribe(
    (result) => {
      this.asistencia = result
      if (this.asistencia.rutina == "0") {
        this.accion = "new"
      }
      else {
        this.rutinaService.getRutina(this.asistencia.rutina).subscribe(
          (result) => {
            Object.assign(this.ejerciciosSeleccionados, result.ejercicios);
            if (this.ejerciciosSeleccionados.length > 0) { this.accion = "update" } else { this.accion = "new" };
          }
        )
      }
    });}


  /**
   * Encuntra el rol con el que esta logeado el usuario para mostrar el formulario
   */
  comprobarRol() {
    this.rolService.getRol(this.loginService.rolLogged()).subscribe(
      (result) => {
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
 * Filtra los ejercicios deacuerdo a los combos
 */
  filtrarEjercicios() {
    console.log(this.musculosControl.value + this.funcionControl.value + this.dificultadControl.value)
    this.ejercicioService.getEjercicio(this.musculosControl.value + "/" + this.funcionControl.value + "/" + this.dificultadControl.value).subscribe(
      (result) => {
        this.ejercicios = new Array<Ejercicio>();
        result.forEach(element => {
          let uEjercicio = new Ejercicio();
          Object.assign(uEjercicio, element);
          this.ejercicios.push(uEjercicio);
        });
        if (this.ejercicios.length > 0) {
          this.dataSource.data = this.ejercicios;
          this.ready = true;
        } else {
          this.ready = false;
        }
      }
    )
  }


  /**
   * Agrega un ejercicio a el Arreglo de seleccinados
   * @param ejercicio Ejercicio a seleccionar
   */
  agregarSeleccionado(ejercicio: Ejercicio) {
    this.ejerciciosSeleccionados.push(ejercicio);
  }


  /**
   * Quita un ejercicio de el Arreglo de seleccinados
   * @param ejercicio Ejercicio a deseleccionar
   */
  quitarSeleccionado(ejercicio: Ejercicio) {
    console.log(this.ejerciciosSeleccionados)
    this.ejerciciosSeleccionados.splice(this.ejerciciosSeleccionados.findIndex(element => element._id == ejercicio._id), 1)
    console.log(this.ejerciciosSeleccionados)
  }


  /**
   * Verificar los ejercicios que ya estan en la lista de seleccionados
   * @param ejercicio Ejercicio
   * @returns Falso: El ejercicio NO esta en la lista | Verdadero: El ejercicio esta en la lista
   */
  comprobarSeleccionados(ejercicio: Ejercicio): Boolean {
    if (this.ejerciciosSeleccionados.findIndex(element => element._id == ejercicio._id) == -1) {
      return false;
    } else {
      return true;
    }
  }

  
  /**
   * Asigna una rutina en la Asistencia indicada
   */
  asignarRutina() {
    this.rutina = new Rutina();
    this.rutina.ejercicios = this.ejerciciosSeleccionados;
    this.rutina.asistencia = this.asistencia._id;
    this.rutinaService.postRutina(this.rutina).subscribe(
      (result) => {
        if (result.status == "1") {
          this.rutinaService.getRutinaAsistencia(this.asistencia._id).subscribe(
            (result) => {
              this.asistencia.rutina = result[0]._id;
              this.asistenciaService.modificarAsistencia(this.asistencia).subscribe(
                (result) => {
                  if (result.status == "1") {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Rutina creada',
                      showConfirmButton: false,
                      timer: 2000
                    })
                    this.router.navigate(['asistencia/' + this.asistencia.alumno])
                  }
                })
            })

        }
      })
  }


  /**
   * Modifica la rutina indicada (carga los ejercicios seleccionados) 
   */
  modificarRutina() {
    this.rutina = new Rutina();
    this.rutina._id = this.asistencia.rutina;
    this.rutina.ejercicios = this.ejerciciosSeleccionados;
    this.rutina.asistencia = this.asistencia._id;
    this.rutinaService.modificarRutina(this.rutina).subscribe(
      (result) => {
        if (result.status == "1") {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Rutina Modificada',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['asistencia/' + this.asistencia.alumno])
        }
      }
    )
  }
}
