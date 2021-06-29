import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanFormComponent } from '../gestion/plan-form/plan-form.component';
import { LoginService } from 'src/app/services/login.service';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  planes: Array<Plan>;
  ready: boolean = false;
  plan: Plan = new Plan();
  rol: Rol = new Rol();
  constructor(private planService: PlanService, 
    private dialog: MatDialog,
    private loginService: LoginService,
    private rolService: RolService) {
    this.comprobarRol();
    this.listPlanes();
   }

  ngOnInit(): void {
  }

  /**
   * Encuntra el rol con el que esta logeado el usuario para mostrar el formulario
   */
   comprobarRol() {
    this.rolService.getRol(this.loginService.rolLogged()).subscribe(
      (result) => {
        Object.assign(this.rol, result);
      }
    )
  }


  listPlanes(){
    this.planService.getPlan().subscribe(
      (result)=>{
        this.planes = new Array<Plan>();
        result.forEach(element => {
          let uPlan = new Plan();
          Object.assign(uPlan, element);
          this.planes.push(uPlan);
        });
        this.ready = true;
      }
    )
  }

  crearPlan(){
    const dialogRef = this.dialog.open(PlanFormComponent, {
      width: '500px',
      data: {
        plan : "0",
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.listPlanes();
    })
  }

  modificarPlan(uPlan: Plan){
    const dialogRef = this.dialog.open(PlanFormComponent, {
      width: '500px',
      data: {
        plan : uPlan,
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.listPlanes();
    })
  }
}
