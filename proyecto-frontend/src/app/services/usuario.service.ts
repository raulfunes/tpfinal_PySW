import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  getUsuario():Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "usuario", option);
  }

  postUsuario(usuario: Usuario):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(usuario)
    return this.http.post(this.urlbase + "usuario", body ,option);
  }

  modificarUsuario(usuario:Usuario):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })

    }
    let body = JSON.stringify(usuario)
    return this.http.put(this.urlbase + "usuario/" + usuario._id, body ,option);
  }
}
