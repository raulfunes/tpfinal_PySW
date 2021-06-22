import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  urlbase:string="http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  getPlan():Observable<any>{
    let option={
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })

    }
    return this.http.get(this.urlbase + "plan", option);
  }

  postPlan(plan: Plan):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(plan)
    return this.http.post(this.urlbase + "plan", body ,option);
  }


  deletePlan(id:string):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    return this.http.delete(this.urlbase + "plan/" + id , option);
  }

  modificarPlan(plan:Plan):Observable<any>{
    let option={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })

    }
    let body = JSON.stringify(plan)
    return this.http.put(this.urlbase + "plan/" + plan._id, body ,option);
  }
}
