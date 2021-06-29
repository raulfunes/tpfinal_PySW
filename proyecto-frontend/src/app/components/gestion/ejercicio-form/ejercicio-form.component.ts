import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import Swal from 'sweetalert2';
import { RutinaFormComponent } from '../rutina-form/rutina-form.component';

@Component({
  selector: 'app-ejercicio-form',
  templateUrl: './ejercicio-form.component.html',
  styleUrls: ['./ejercicio-form.component.css']
})
export class EjercicioFormComponent implements OnInit {

  ejerciciosFormGroup: FormGroup;
  musculos = ['Pecho', 'Espalda', 'Piernas', 'Biceps', 'Triceps', 'Hombros', "Abdomen"];
  funcion = ["Musculacion", "Cardio", "Zumba", "Yoga"];
  dificultad = ["Adaptacion", "Facil", "Medio", "Dificil"];
  
  constructor(private _formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<RutinaFormComponent>,
    private ejercicioService: EjercicioService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  ngOnInit(): void {
    this.ejerciciosFormGroup = this._formBuilder.group({
      nombre:['', Validators.required],
      descripcion: ['',Validators.required],
      video: ['', Validators.required],
      funcion: ['', Validators.required],
      repeticiones_promedio: ['', Validators.required],
      series_promedio: ['', Validators.required],
      area_muscular: ['', Validators.required],
      dificultad: ['', Validators.required]
    });
  }

  guardarEjercicio(){
    this.ejercicioService.postEjercicio(this.ejerciciosFormGroup.value).subscribe(
      (result)=>{
        if (result.status == "1"){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ejercicio creado',
            showConfirmButton: false,
            timer: 1500
          })
          this.ejerciciosFormGroup.reset();
        }
      }
    )
  }

}
