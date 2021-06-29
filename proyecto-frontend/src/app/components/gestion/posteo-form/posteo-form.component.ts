import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';
import { take } from 'rxjs/operators';
import { Rol } from 'src/app/models/rol';
import { LoginService } from 'src/app/services/login.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-posteo-form',
  templateUrl: './posteo-form.component.html',
  styleUrls: ['./posteo-form.component.css']
})
export class PosteoFormComponent implements OnInit {
  accion: string;
  postForm: FormGroup;
  close: boolean = false;
  
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(private fb: FacebookService,
    private frmb: FormBuilder,
    public dialogRef: MatDialogRef<PosteoFormComponent>,
    private _ngZone: NgZone,

    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.postForm = this.frmb.group({
        mensaje: ['', Validators.required]
      })
    this.iniciarFb();
    this.load()
  }
  ngOnInit(): void {
  }


  load(){
    console.log(this.data)
    if (this.data.id == "0"){
      this.accion = "new";
    }
    else{
      this.accion = "update";
      this.postForm.setValue({mensaje: this.data.message})
    }
    
  }
  
  postFb() {
    var apiMethod: ApiMethod = "post";
    this.fb.api('/112504197750658/feed', apiMethod,
      {
        "message": this.postForm.value.mensaje,
        "access_token": this.data.token
      }).then(res => {this.close=true});
  }

  modifyFb(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/' +this.data.id, apiMethod,
      {
        "message": this.postForm.value.mensaje,
        "access_token": this.data.token
      }).then(res => {this.close=true});
  }


  iniciarFb() {
    let initParams: InitParams = {
      appId: '240182844274820',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v11.0'
    };
    this.fb.init(initParams);
  }


  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
