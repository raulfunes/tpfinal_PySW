import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  personaFormGroup: FormGroup;
  usuarioFormGroup: FormGroup;
  roles: Array<Rol>;
  persona:Persona
  usuario:Usuario = new Usuario();
  hide:boolean = true;
  accion:string;
  alumno_id: string;
  nombre_valido: boolean = true;
  constructor(private _formBuilder: FormBuilder, 
    private router:Router, 
    private rolService: RolService, 
    private personaSevice: PersonaService, 
    private usuarioService: UsuarioService, 
    private activatedRoute: ActivatedRoute, 
    private route: Router, 
    public dialogRef: MatDialogRef<SignupComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
    this.load();
    this.listRoles();
  }

  ngOnInit(): void {
    this.personaFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email:['', Validators.required],
      celular: ['',Validators.required],
      domicilio: ['', Validators.required],
      fecha_nac: ['', Validators.required],
    });
    this.usuarioFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });

  }


  load(){
    if(this.data.persona != 0){
      this.accion = "Alumno";
      this.alumno_id = this.data.persona;
    }else{
      this.accion = "Entrenador"
    }
  }


  listRoles(){
    this.rolService.getRoles().subscribe(
      (result)=>{
        console.log(result)
        this.roles = new Array<Rol>();
        result.forEach(element => {
          let uRol = new Rol()
          Object.assign(uRol, element)
          if(uRol.descripcion == this.accion){
            this.roles.push(uRol)
          }
        });
      }
    )
  }

  crearUsuarioEntrenador(){
    this.persona = this.personaFormGroup.value;
    this.usuario = this.usuarioFormGroup.value;
    this.personaSevice.postPersona(this.persona).subscribe(
      (resultPersona)=>{
        if(resultPersona.status == "1"){
          this.usuario.persona = resultPersona.id;
          this.usuarioService.postUsuario(this.usuario).subscribe(
            (resultUsuario)=>{
              if(resultUsuario.status == "1"){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Usuario creado',
                  showConfirmButton: false,
                  timer: 2000
                })
                this.personaFormGroup.reset();
                this.usuarioFormGroup.reset();
              }
            }
          )
        }
      }
    )
  }




  crearUsuarioAlumno(){
    this.usuario = this.usuarioFormGroup.value;
    this.personaSevice.getPersona(this.alumno_id).subscribe(
      (resultPersona)=>{
        console.log(resultPersona);
        if(resultPersona != []){
          this.usuario.persona = resultPersona
          this.usuarioService.postUsuario(this.usuario).subscribe(
            (resultUsuario)=>{
              console.log(resultUsuario);
              if(resultUsuario.status == "1"){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Usuario creado',
                  showConfirmButton: false,
                  timer: 2000
                })
                this.router.navigate(['alumno'])
              }
            }
          )
        }
      }
    )
  }

  comprobarUsername(){
    this.usuarioService.comprobarNombre(this.usuarioFormGroup.value.username).subscribe(
      (result)=>{
        if(result.status == "1"){
          this.nombre_valido = false;
        }
        else{
          this.nombre_valido = true;
        }
      }
    )
  }
}
