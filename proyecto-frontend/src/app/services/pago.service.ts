import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

URL: string = "http://localhost:3000/api/pago";

  constructor(private _http: HttpClient) { }

  /*Obtiene un listado de pagos*/
  public getPagos(): Observable<any> {
    let _option = {
      header: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.URL, _option);
  }

  public getPagoAlumno(alumno: String): Observable<any> {
    let _option = {
      header: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.URL+ "/"+ alumno, _option);
  }


  public getUltimoPagoAlumno(alumno: String): Observable<any> {
    let _option = {
      header: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this._http.get(this.URL+ "/alumno/"+ alumno, _option);
  }



  /*Agrega un pago*/
  public addPago(_pago: Pago): Observable<any> {
    let _option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    params: new HttpParams({})
    }
    let _body = JSON.stringify(_pago);

    return this._http.post(this.URL, _body, _option);
  }

  /* Elimina un pago*/
  public deletePago(_id: string): Observable<any> {
    let _option = {
      header: new HttpHeaders({
        "Conten-Type": "application/json"
      }),
        params: new HttpParams({})
    }

    return this._http.delete(this.URL + "/" + _id, _option);
  }

  /*Modifica un pago*/
  public updatePago(_pago: Pago): Observable<any> {
    let _option = {
      header: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({})
    }

    let _body = JSON.stringify(_pago);

    return this._http.put(this.URL + "/" + _pago._id, _body, _option);

  }


}
