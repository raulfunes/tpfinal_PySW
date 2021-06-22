import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  getPersonas():Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "persona", option);
  }

  getPersona(_id:string):Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "persona/" + _id, option);
  }

  postPersona(persona: Persona):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(persona)
    return this.http.post(this.urlbase + "persona", body ,option);
  }


  modificarPersona(persona:Persona):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })

    }
    let body = JSON.stringify(persona)
    return this.http.put(this.urlbase + "persona/" + persona._id, body ,option);
  }
}
