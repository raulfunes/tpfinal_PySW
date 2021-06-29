import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';
import { RutinaFormComponent } from '../rutina-form/rutina-form.component';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {
  plan:Plan = new Plan()
  formPlan: FormGroup;
  accion: String;
  constructor(private fb: FormBuilder, 
    private _ngZone: NgZone, 
    private planService: PlanService,
    public dialogRef: MatDialogRef<RutinaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.formPlan = this.fb.group({
        nombre: ['',Validators.required],
        descripcion: ['',Validators.required],
        dias:['',Validators.required],
        monto: ['',Validators.required]
      })
      this.load();
     }

  ngOnInit(): void {

  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  load(){
    if(this.data.plan != "0"){
      this.accion = "update"
      this.formPlan.setValue(
        {
          nombre: this.data.plan.nombre,
          descripcion: this.data.plan.descripcion,
          dias: this.data.plan.dias,
          monto: this.data.plan.monto
        }
      )
    }else{
      this.accion = "new"
    }
  }


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

  modificarPlan(){
    this.plan._id = this.data.plan;
    Object.assign(this.plan, this.formPlan.value)
    this.planService.modificarPlan(this.plan).subscribe(
      (result)=>{
        if (result.status == "1"){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Plan Modificado',
            showConfirmButton: false,
            timer: 1500
          })
          this.formPlan.reset();
        } 
      }
    )
  }
}
