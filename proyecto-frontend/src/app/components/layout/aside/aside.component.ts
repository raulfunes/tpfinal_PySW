import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Alumno } from 'src/app/models/alumno';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AlumnoService } from 'src/app/services/alumno.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnDestroy {
  open = true;
  toogle = false;
  ready: boolean = true;
  mode = new FormControl('side');
  destroyed = new Subject<void>();
  currentScreenSize: string;
  public logged: boolean;
  persona: Persona = new Persona();
  rol: Rol = new Rol();
  alumno: Alumno = new Alumno();
  // Cambia la funcionalidad de la barra lateral.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver, private route: Router, private userService: LoginService, private personaService: PersonaService, private rolService: RolService, private alumnoService: AlumnoService) {
    this.login();

    //Observer de los tamaños
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          this.small_device();
        }
      }
    });
  }

  /**
   * Cambia el sidenav de Abierto a Cerrado dependiendo del tamaño
   */
  small_device() {
    if (this.currentScreenSize == "Small" || this.currentScreenSize == "XSmall") {
      this.open = false;
      this.mode = new FormControl('over');
      this.toogle = true
    } else {
      this.toogle = false;
      this.open = true;
      this.mode = new FormControl('side');
    }
  }

  cerrarSlide(){
    if (this.currentScreenSize == "Small" || this.currentScreenSize == "XSmall") {
      if(this.open == true){
        this.open = false;
      }else{
        this.open = true;
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }


  /**
   * Trae los datos de la Persona Logeada
   */
  getPersonaLogged() {
    this.personaService.getPersona(this.userService.perfilLogged()).subscribe(
      (result) => {
        this.persona = new Persona()
        Object.assign(this.persona, result);
        this.getRolLogged();
      }
    )
  }


  /**
   * Trae el Rol de la persona logeada
   */
  getRolLogged() {
    this.rolService.getRol(this.userService.rolLogged()).subscribe(
      (result) => {
        this.rol = new Rol();
        Object.assign(this.rol, result);
        if(this.rol.descripcion == "Alumno"){
          this.getAlumnoLogged(this.persona._id);
        }
      }
    )
  }

/**
 * Si el rol es "Alumno" trae sus datos.
 * @param persona 
 * ID Persona
 */
  getAlumnoLogged(persona: String){
    this.alumnoService.getAlumnoPersona(persona).subscribe(
      (result)=>{
        this.alumno = new Alumno();
        Object.assign(this.alumno, result[0]);
        console.log(this.alumno)
        this.ready = true;
      }
    )
  }


  /**
   * Asigna a los valores de Persona y Rol si es que hay alguien logeado
   */
  login() {
    this.logged = this.userService.userLoggedIn();
    if (this.logged == true) {
      this.getPersonaLogged();
    } else {
      this.rol = new Rol();
      this.rol.descripcion = "None"
      this.persona = new Persona();
      this.persona.nombre = "None"
      this.alumno = new Alumno();
      this.ready = true
    }

  }


  /**
   * Cierra la sesion del usuario
   */
  logout() {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Loged Out',
      showConfirmButton: false,
      timer: 1500
    })
    this.userService.logout();
    this.logged = false;
    this.login();
  }


  /**
   * Redirige si el usuario logeado es un "Alumno" a su pestaña de asistencia
   */
  asistenciaAlumno() {
    this.alumnoService.getAlumnoPersona(this.persona._id).subscribe(
      (result) => {
        console.log(result);
        this.route.navigate(["asistencia-a/", result[0]._id])
      }
    )
  }



  /**
 * Redirige si el usuario logeado es un "Alumno" a su pestaña de pago
 */
  pagoAlumno() {
    this.alumnoService.getAlumnoPersona(this.persona._id).subscribe(
      (result) => {
        console.log(result);
        this.route.navigate(["pago-a/", result[0]._id])
      }
    )
  }


}
