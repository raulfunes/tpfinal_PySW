import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { AsideComponent } from '../layout/aside/aside.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userform: Usuario;
  msglogin: string; // mensaje que indica si no paso el loguin
  returnUrl: string;
  usuarioFormGroup: FormGroup;
  hide: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private asideComponent: AsideComponent,
    private _formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.usuarioFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.userform = this.usuarioFormGroup.value;
    this.loginService.login(this.userform.username, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("perfil", user.persona);
            sessionStorage.setItem("rol", user.rol);
            this.asideComponent.login();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Logged In',
              showConfirmButton: false,
              timer: 1500
            })
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Credenciales Incorrectas',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });

  }


}
