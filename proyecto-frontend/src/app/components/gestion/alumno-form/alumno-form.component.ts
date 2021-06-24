import { StepperOptions, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Persona } from 'src/app/models/persona';
import { Plan } from 'src/app/models/plan';
import { AlumnoService } from 'src/app/services/alumno.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  persona:Persona;
  alumno:Alumno;
  stepper: StepperSelectionEvent;
  planes: Array<Plan>
  accion: String;
  idPersonaModificar: String;
  idAlumnoModificar:String;
  constructor(private _formBuilder: FormBuilder, private planService:PlanService, private personaService:PersonaService
    , private alumnoService: AlumnoService, private activatedRoute: ActivatedRoute, private router:Router) { 
    this.listPlanes();
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email:['', Validators.required],
      celular: ['',Validators.required],
      domicilio: ['', Validators.required],
      fecha_nac: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      plan: ['', Validators.required],
      fecha_inicio: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(
      params=>{
        if (params.id == "0"){
          this.accion = "new";
        }else{
          this.accion = "new";
          this.cargarAlumno(params.id);
        }
      }
    )
  }
  
  agregarAlumno(){
    this.persona = new Persona();
    Object.assign(this.persona, this.firstFormGroup.value)
    this.personaService.postPersona(this.persona).subscribe(
      (result)=>{
        if (result.status == "1"){
          this.alumno = new Alumno();
          Object.assign(this.alumno, this.secondFormGroup.value);
          this.alumno.persona = result.id;
          this.alumno.dias_restantes = 0;
          this.alumnoService.postAlumno(this.alumno).subscribe(
            (resultAlu)=>{
              console.log(resultAlu)
              if(resultAlu.status == "1"){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Alumno creado',
                  showConfirmButton: false,
                  timer: 2000
                })
                this.firstFormGroup.reset();
                this.secondFormGroup.reset();

                this.stepper ;
                
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Alumno no creado!',
                })
              }
            },
            (errorAlu)=>{
              console.log(errorAlu);
            }
          )
        }
        console.log(result);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  
  modificarAlumno(){
    Object.assign(this.persona, this.firstFormGroup.value);
    this.personaService.modificarPersona(this.persona).subscribe(
      (result)=>{
          console.log(result);
          this.alumno = new Alumno()
          this.alumno._id = this.idAlumnoModificar;
          this.alumnoService.modificarAlumno(this.alumno).subscribe(
            (result)=>{
              if (result.status == "1"){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Alumno modificado',
                  showConfirmButton: false,
                  timer: 2000
                })
                this.router.navigate(['alumno'])
              }
              else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'No fue posible modificar',
                })
              }
            }
          )        
      }
    )
  }


  listPlanes(){
    this.planService.getPlan().subscribe(
      (result)=>{
        this.planes = new Array<Plan>();
        result.forEach(element => {
          let oPlan = new Plan();
          Object.assign(oPlan, element);
          this.planes.push(oPlan);
        });
        console.log(result);              
      }
    ) 
  }

  cargarAlumno(id){
    //Llama al service
    this.alumnoService.getAlumno(id).subscribe(
      (result)=>{
          //Obtiene el resultado de el alumno
          this.accion = "update"
          this.alumno = new Alumno();
          this.alumno._id = id;
          this.personaService.getPersona(result.persona).subscribe(
            (result2)=>{
              //Obtiene el resultado de la persona
              this.persona = new Persona;
              this.persona._id = result.persona;
              //Modifica el formulario de la persona
              this.firstFormGroup.setValue({
                nombre: result2.nombre,
                apellido: result2.apellido,
                dni: result2.dni,
                email: result2.email,
                celular: result2.celular,
                domicilio: result2.domicilio,
                fecha_nac: result2.fecha_nac,
              })
              //Modifica el formulario de el alumno
              this.secondFormGroup.setValue({
                plan: result.plan,
                fecha_inicio: result.fecha_inicio
              })
            }
          )
        },
        (error)=>{
          console.log(error)
        }
    )
  }

}
