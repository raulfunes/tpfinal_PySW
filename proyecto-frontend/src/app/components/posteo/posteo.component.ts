import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FacebookService, InitParams } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';
import { Posteo } from 'src/app/models/posteo';
import { Rol } from 'src/app/models/rol';
import { LoginService } from 'src/app/services/login.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
import { PosteoFormComponent } from '../gestion/posteo-form/posteo-form.component';

@Component({
  selector: 'app-posteo',
  templateUrl: './posteo.component.html',
  styleUrls: ['./posteo.component.css']
})
export class PosteoComponent implements OnInit {
  posteos:Array<Posteo> = new Array<Posteo>();
  mensaje: string = "";
  rol: Rol = new Rol();
  constructor(private fb: FacebookService, 
    private dialog: MatDialog,
    private loginService: LoginService,
    private rolService: RolService,) {
    this.comprobarRol();
    this.iniciarFb();
    this.getpostFb();
  }
  ngOnInit(): void {
  }


  getpostFb() {
    var apiMethod: ApiMethod = "get";
    this.fb.api('/112504197750658/posts', apiMethod,
      {
        "access_token": "EAADace0dOIQBABSjKw5E9SB1WMh0QhRuZBgCgPfr9uibPku8ZBoat1rRI0VgfMZAgly8xq4d52VERO5LZAursAE5Chspb3UxC9yrFvp8r0p4hum8oB8KJ8yzlXpf7ZA0AUXYAZBSKXDxayqSN8H8XPWTyDva1L5H1qPXgWTypTHacbLbqQlMtS3uFmwUHCaKHOPqHG3Jm5OQZDZD"
      }).then(res =>  res.data.forEach(post => {
        let uPosteo = new Posteo();  
        Object.assign(uPosteo, post);
        this.posteos.push(uPosteo);
      })
      );
  }

  /**
   * Encuntra el rol con el que esta logeado el usuario para mostrar el formulario
   */
       comprobarRol() {
        this.rolService.getRol(this.loginService.rolLogged()).subscribe(
          (result) => {
            Object.assign(this.rol, result);
          }
        )
      }



  iniciarFb() {
    let initParams: InitParams = {
      appId: '240182844274820',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v11.0'
    };
    this.fb.init(initParams);
  }

  formatearFecha(date:Date):String{
    var d = new Date(date);
    return d.toLocaleString();
  }

  crearPosteo(){
    const dialogRef = this.dialog.open(PosteoFormComponent, {
      width: '500px',
      data: {
        id : "0",
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.posteos = new Array<Posteo>();
      this.getpostFb();
    })
  }

  modificarPosteo(posteo: Posteo){
    const dialogRef = this.dialog.open(PosteoFormComponent, {
      width: '500px',
      data: {
        id : posteo.id,
        message : posteo.message
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.posteos = new Array<Posteo>();
      this.getpostFb();
    })
  }


  eliminarPosteo(id: String){
    var apiMethod: ApiMethod = "delete";
    this.fb.api('/' + id, apiMethod,
      {
        "access_token": "EAADace0dOIQBABSjKw5E9SB1WMh0QhRuZBgCgPfr9uibPku8ZBoat1rRI0VgfMZAgly8xq4d52VERO5LZAursAE5Chspb3UxC9yrFvp8r0p4hum8oB8KJ8yzlXpf7ZA0AUXYAZBSKXDxayqSN8H8XPWTyDva1L5H1qPXgWTypTHacbLbqQlMtS3uFmwUHCaKHOPqHG3Jm5OQZDZD"
      }).then(res => {
        this.posteos = new Array<Posteo>();
        this.getpostFb();
      });

  }
}
