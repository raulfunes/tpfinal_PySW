import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutina } from '../models/rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {


  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) { }



  getRutina(id: String):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "rutina/" + id , option);
  }

  getRutinaAsistencia(asistencia: String):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "rutina/asistencia/" + asistencia , option);
  }


  postRutina(rutina: Rutina):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(rutina);
    return this.http.post(this.urlbase + "rutina", body ,option);
  }
}
