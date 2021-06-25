import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { Persona } from 'src/app/models/persona';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnDestroy {
  open = true;
  mode = new FormControl('side');
  destroyed = new Subject<void>();
  currentScreenSize: string;
  public logged: boolean;
  persona: Persona;
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver, private userService: LoginService, private personaService: PersonaService) {
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
      }
    )
  }


  public static log(): void{
    
  }


  login(){
    this.logged = this.userService.userLoggedIn();
    if(this.logged == true){
      this.getPersonaLogged();
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
    this.persona = new Persona();
  }
}
