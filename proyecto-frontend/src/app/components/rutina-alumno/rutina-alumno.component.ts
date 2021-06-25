import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia';
import { Ejercicio } from 'src/app/models/ejercicio';
import { Rutina } from 'src/app/models/rutina';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { RutinaService } from 'src/app/services/rutina.service';

@Component({
  selector: 'app-rutina-alumno',
  templateUrl: './rutina-alumno.component.html',
  styleUrls: ['./rutina-alumno.component.css']
})
export class RutinaAlumnoComponent implements OnInit {
  displayedColumns: string[] = ['nombre' ,'descripcion' ,'repeticiones' , 'series' , 'video'];
  asistencia: Asistencia;
  ejercicios: Array<Ejercicio>;
  rutina: Rutina;
  dataSource: MatTableDataSource<Ejercicio>;
  ready: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private asistenciaService: AsistenciaService, private rutinaService: RutinaService) {
    this.dataSource = new MatTableDataSource<Ejercicio>();
    this.ejercicios = new Array<Ejercicio>();
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
        this.asistenciaService.getAsistencia(params.asistencia).subscribe(
          (result)=>{
            console.log(result)
            this.asistencia = result
            this.rutinaService.getRutina(this.asistencia.rutina).subscribe(
              (result2) => {
                this.rutina = result2;
                Object.assign(this.ejercicios, result2.ejercicios);
                console.log(this.ejercicios)
                this.ready = true;
                this.dataSource.data = this.ejercicios;
              }
            )
          },
          (error)=>{console.log(error)}
        )
      }
    );
  }

}
