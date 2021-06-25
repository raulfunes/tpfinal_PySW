import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  getAlumnos():Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "alumno", option);
  }

  getAlumno(_id : String):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "alumno/" + _id, option);
  }
  
  getAlumnoPersona(_id : String):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "alumno/persona/" + _id, option);
  }


  postAlumno(alumno: Alumno):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(alumno)
    return this.http.post(this.urlbase + "alumno", body ,option);
  }


  deleteAlumno(id:string):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    return this.http.delete(this.urlbase + "alumno/" + id , option);
  }

  modificarAlumno(alumno:Alumno):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })

    }
    let body = JSON.stringify(alumno)
    return this.http.put(this.urlbase + "alumno/" + alumno._id, body ,option);
  }
}
