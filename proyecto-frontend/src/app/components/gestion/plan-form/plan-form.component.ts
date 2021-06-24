import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {


  plan:Plan = new Plan()
  formPlan: FormGroup;
  constructor(private fb: FormBuilder, private _ngZone: NgZone, private planService: PlanService) { }
  ngOnInit(): void {
    this.formPlan = this.fb.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      dias:['',Validators.required],
      monto: ['',Validators.required]
    })
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }


  agregarPlan(){
    this.plan = this.formPlan.value;
    this.planService.postPlan(this.plan).subscribe(
      (result)=>{
        if (result.status == "1"){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Plan Creado',
            showConfirmButton: false,
            timer: 1500
          })
          this.formPlan.reset();
        } 
      }
    )
  }
}
