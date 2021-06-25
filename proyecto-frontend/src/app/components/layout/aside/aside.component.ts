import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AlumnoService } from 'src/app/services/alumno.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnDestroy {
  open = true;
  ready: boolean = false;
  mode = new FormControl('side');
  destroyed = new Subject<void>();
  currentScreenSize: string;
  public logged: boolean;
  persona: Persona;
  rol: Rol;
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver,private route:Router, private userService: LoginService, private personaService: PersonaService, private rolService: RolService, private alumnoService: AlumnoService) {
    this.login();
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
    this.rol = new Rol();
    this.rol.descripcion = "None"
    this.persona = new Persona();
    this.persona.nombre = "None"
  }

  small_device(){
    if(this.currentScreenSize == "Small" || this.currentScreenSize == "XSmall"){
      this.open = false;
    }else{
      this.open = true;
    }
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getPersonaLogged(){
    this.personaService.getPersona(this.userService.perfilLogged()).subscribe(
      (result)=>{
        this.persona = new Persona()
        Object.assign(this.persona, result);
        this.ready = true;
      }
    )
  }



  getRolLogged(){
    this.rolService.getRol(this.userService.rolLogged()).subscribe(
      (result)=>{
        this.rol = new Rol();
        Object.assign(this.rol, result);
        this.ready = true;
      }
    )
  }


  login(){
    this.logged = this.userService.userLoggedIn();
    if(this.logged == true){
      this.getPersonaLogged();
      this.getRolLogged();
    }else{
      this.rol = new Rol();
      this.rol.descripcion = "None"
      this.persona = new Persona();
      this.persona.nombre = "None"
      this.ready = true
    }

  }

  logout(){
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


  asistenciaAlumno(){
    this.alumnoService.getAlumnoPersona(this.persona._id).subscribe(
      (result)=>{
        console.log(result);
        this.route.navigate(["asistencia-a/", result[0]._id])
      }
    )
  }
}
