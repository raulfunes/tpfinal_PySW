import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  getRoles():Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "rol", option);
  }
  getRol(id: string):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "rol/" + id, option);
  }

  postRol(rol: Rol):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(rol)
    return this.http.post(this.urlbase + "rol", body ,option);
  }


  deleteRol(id:string):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    return this.http.delete(this.urlbase + "rol/" + id , option);
  }

  modificarRol(rol:Rol):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })

    }
    let body = JSON.stringify(rol)
    return this.http.put(this.urlbase + "rol/" + rol._id, body ,option);
  }
}
