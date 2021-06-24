import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  planes: Array<Plan>;
  ready: boolean = false;
  constructor(private planService: PlanService) {
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
}
