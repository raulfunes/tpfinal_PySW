import { Component, Inject, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  planes: Array<Plan>;
  ready: boolean = false;
  plan: Plan = new Plan();
  constructor(private planService: PlanService, private dialog: MatDialog) {
    this.listPlanes();
   }

  ngOnInit(): void {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPlan, {
      width: '100%',
      height: '50%',
      data: {data: this.plan}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.plan.nombre);
    });
  }
}

@Component({
  selector: 'app-plan-dialog',
  templateUrl: './plan.component-dialog.html'
})
export class DialogPlan {

  constructor(
    public dialogRef: MatDialogRef<DialogPlan>,
    @Inject(MAT_DIALOG_DATA) public data: Plan) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}