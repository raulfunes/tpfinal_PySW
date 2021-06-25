import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { Plan } from 'src/app/models/plan';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pago-alumno',
  templateUrl: './pago-alumno.component.html',
  styleUrls: ['./pago-alumno.component.css']
})
export class PagoAlumnoComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'monto', 'modo' ,'plan'];
  pagos: Array<Pago>;
  ready:boolean = true;
  date: Date = new Date();
  dataSource: MatTableDataSource<Pago>;
  plan: Plan
  pago: Pago


  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private pagoService: PagoService, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=>{
          this.getPagos(params.alumno);
    })
  }


/**
 * Devuelve los pagos de un alumno
 * @param alumno ID Alumno
 */
  getPagos(alumno: String){
    this.pagoService.getPagoAlumno(alumno).subscribe(
      (result)=>{
        this.pagos = new Array<Pago>();
        result.forEach(element => {
          let uPago = new Pago();
          Object.assign(uPago, element)
          this.pagos.push(uPago)
        });
        if(this.pagos.length > 0){
          this.dataSource = new MatTableDataSource<Pago>(this.pagos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.ready = true;
        }else{
          this.ready = false;
        }
      }
    )
  }

/**
 * Formateador de fechas
 * @param a Un Pago
 * @returns Una fecha parseada
 */
  verAsistencia(a: Pago): String{
    let d = new Date(a.fecha_pago);
    return d.toLocaleDateString();
  }
}
