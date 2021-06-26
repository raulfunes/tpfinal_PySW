import { StepperOptions, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Persona } from 'src/app/models/persona';
import { Plan } from 'src/app/models/plan';
import { Rol } from 'src/app/models/rol';
import { AlumnoService } from 'src/app/services/alumno.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PlanService } from 'src/app/services/plan.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {
  //Form Groups
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  stepper: StepperSelectionEvent;
  
  //Contenedores
  persona:Persona = new Persona();
  alumno: Alumno = new Alumno();
  planes: Array<Plan>
  idPersonaModificar: String;
  idAlumnoModificar:String;

  //Validacion
  accion: String;
  autenticacion: boolean = true;

  constructor(private _formBuilder: FormBuilder, 
    private planService:PlanService, 
    private personaService:PersonaService, 
    private alumnoService: AlumnoService, 
    private activatedRoute: ActivatedRoute, 
    private router:Router, 
    private loginService: LoginService, 
    private rolService: RolService){ 

    this.listPlanes();
    this.comprobarRutina();
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
  

  /**
   * Encuntra la rutina con la que esta logeado el usuario para mostrar el formulario
   */
  comprobarRutina(){
    this.rolService.getRol(this.loginService.rolLogged()).subscribe(
      (result)=>{
        let rol = new Rol();
        Object.assign(rol, result);
        console.log(rol);
        if(rol.descripcion != "Entrenador"){
          this.autenticacion = false;
        }
      }
    )
  }

/**
 * Agrega un Alumno a la BD
 */
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
  

  /**
   * Modifica un alumno de la BD
   */
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


  /**
   * Lista los planes para el combo
   */
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


  /**
   * Carga los datos de un alumno a modificar
   * @param id ID alumno a modificar
   */
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
