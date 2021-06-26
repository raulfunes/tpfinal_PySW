import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostBase: string;
  constructor(private _http: HttpClient, private rolService: RolService) {
    this.hostBase = "http://localhost:3000/api/usuario/";
  }
  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    return this._http.post(this.hostBase + 'login', body, httpOption);
  }
  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
  }


  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }

  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }

  public perfilLogged(){
    var persona = sessionStorage.getItem("perfil");
    return persona;
  }

  public rolLogged(){
    var rol = sessionStorage.getItem("rol");
    return rol;
  }

  getToken():string{
    if (sessionStorage.getItem("token")!= null){
    return sessionStorage.getItem("token");
    }else{
    return "";
    }
  }

}
