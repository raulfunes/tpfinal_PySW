import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ejercicio } from '../models/ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {


  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  getEjercicio(cadena:String):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "ejercicio/" + cadena, option);
  }


  postEjercicio(ejercicio: Ejercicio):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(ejercicio);
    return this.http.post(this.urlbase + "ejercicio", body ,option);
  }
}
