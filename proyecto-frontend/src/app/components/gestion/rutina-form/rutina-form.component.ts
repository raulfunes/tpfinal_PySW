import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia';
import { Ejercicio } from 'src/app/models/ejercicio';
import { Rutina } from 'src/app/models/rutina';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { RutinaService } from 'src/app/services/rutina.service';

@Component({
  selector: 'app-rutina-form',
  templateUrl: './rutina-form.component.html',
  styleUrls: ['./rutina-form.component.css']
})
export class RutinaFormComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'repeticiones', 'series', 'acciones'];
  ready: boolean = false;
  filtro: string;
  dataSource: MatTableDataSource<Ejercicio>;
  musculosControl = new FormControl('', Validators.required);
  musculos = ['Pecho', 'Espalda', 'Piernas', 'Biceps', 'Triceps', 'Hombros'];
  funcionControl = new FormControl('', Validators.required);
  funcion = ["Musculacion", "Cardio", "Zumba", "Yoga"];
  dificultadControl = new FormControl('', Validators.required);
  dificultad = ["Adaptacion", "Facil", "Medio", "Dificil"];
  ejercicios: Array<Ejercicio>;
  ejerciciosSeleccionados: Array<Ejercicio>;
  rutina: Rutina;
  asistencia: Asistencia;
  accion:String;
  constructor(private activatedRoute: ActivatedRoute, private ejercicioService: EjercicioService, private rutinaService: RutinaService, private router: Router, private asistenciaService: AsistenciaService) {
    this.dataSource = new MatTableDataSource<Ejercicio>();
    this.ejerciciosSeleccionados = new Array<Ejercicio>();
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.asistenciaService.getAsistencia(params.asistencia).subscribe(
          (result)=>{
            this.asistencia = result
            if (this.asistencia.rutina == "0") {
              this.accion = "new"
            } 
            else {
              this.rutinaService.getRutina(this.asistencia.rutina).subscribe(
                (result)=>{
                  Object.assign(this.ejerciciosSeleccionados, result.ejercicios);
                  console.log(this.ejerciciosSeleccionados)
                  if (this.ejerciciosSeleccionados.length == 1) {this.accion = "update"} else {this.accion = "new"}; 
                }
              )
            }
          });

      }
    )
  }


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


  agregarSeleccionado(ejercicio: Ejercicio) {
    this.ejerciciosSeleccionados.push(ejercicio);
  }

  quitarSeleccionado(ejercicio: Ejercicio) {
    this.ejerciciosSeleccionados.splice(this.ejerciciosSeleccionados.findIndex(element => element._id == ejercicio._id))
  }

  comprobarSeleccionados(ejercicio: Ejercicio): Boolean {
    if (this.ejerciciosSeleccionados.findIndex(element => element._id == ejercicio._id) == -1) {
      return false;
    } else {
      return true;
    }
  }

  asignarRutina() {
    this.rutina = new Rutina();
    this.rutina.ejercicios = this.ejerciciosSeleccionados;
    this.rutina.asistencia = this.asistencia._id;
    this.rutinaService.postRutina(this.rutina).subscribe(
      (result) => {
        console.log(result);
        if(result.status == "1"){
          this.rutinaService.getRutina(this.asistencia._id).subscribe(
            (result)=>{
              console.log(result)
              this.asistencia.rutina = result[0]._id;
              console.log(this.asistencia);
              this.asistenciaService.modificarAsistencia(this.asistencia).subscribe(
                (result)=>{
                    console.log(result);
                })
            })
          
        }
      })
  }
}
