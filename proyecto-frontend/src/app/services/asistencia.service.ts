import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  getAsistenciaAlumno(alumno: String):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "asistencia/alumno/" + alumno , option);
  }


  getAsistencia(id: String):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "asistencia/" + id , option);
  }


  postAsistencia(asistencia: Asistencia):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(asistencia);
    return this.http.post(this.urlbase + "asistencia", body ,option);
  }


  modificarAsistencia(asistencia:Asistencia):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })

    }
    let body = JSON.stringify(asistencia)
    return this.http.put(this.urlbase + "asistencia/" + asistencia._id, body ,option);
  }

}
