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
  access_t: string = "EAADace0dOIQBANyy0nPZCZA8Ysf72QNAeyVH9zC0GCBeLZBaGoetWu00iqPK8zz8GVv2iQnPwhWJ5z0dCURqwi67KZCyRXZAQKsjT51J6lKCUXQ0ELrXTAOQAfTFN6vcZCBZAfdYx36MBWWAz1am4ZB4wjAYgpk5S9rmXilHXkIc4DCyJ8wfI9gaZATA8rFuBowtPhr9xSoZBBswZDZD";
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
    this.posteos = new Array<Posteo>();
    var apiMethod: ApiMethod = "get";
    this.fb.api('/112504197750658/posts', apiMethod,
      {
        "access_token": this.access_t
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
        token: this.access_t
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
        token: this.access_t,
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
        "access_token": this.access_t
      }).then(res => {
        this.posteos = new Array<Posteo>();
        this.getpostFb();
      });

  }
}
