import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AsideComponent } from './components/layout/aside/aside.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AlumnoFormComponent } from './components/gestion/alumno-form/alumno-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { RutinaComponent } from './components/rutina/rutina.component';
import { RutinaFormComponent } from './components/gestion/rutina-form/rutina-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { EstadisticasComponent } from './components/entrenador/estadisticas/estadisticas.component';
import { PagoComponent } from './components/entrenador/pago/pago.component';
import { NgxDataTableModule } from 'angular-9-datatable';
import { PlanComponent } from './components/plan/plan.component';
import { MatCardModule } from '@angular/material/card';
import { AsistenciaAlumnoComponent } from './components/asistencia-alumno/asistencia-alumno.component';
import { RutinaAlumnoComponent } from './components/rutina-alumno/rutina-alumno.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PlanFormComponent } from './components/gestion/plan-form/plan-form.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from './services/login.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatIconModule} from '@angular/material/icon';
import { PosteoComponent } from './components/posteo/posteo.component';
import { PosteoFormComponent } from './components/gestion/posteo-form/posteo-form.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    AlumnoComponent,
    AlumnoFormComponent,
    AsistenciaComponent,
    RutinaComponent,
    RutinaFormComponent,
    EstadisticasComponent,
    PagoComponent,
    PlanComponent,
    AsistenciaAlumnoComponent,
    RutinaAlumnoComponent,
    PlanFormComponent,
    LoginComponent,
    SignupComponent,
    PosteoComponent,
    PosteoFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    NgxDataTableModule,
    MatCardModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ],
  exports:[
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ]
  ,

  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
LoginService,
{ provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptorService,
  multi: true
 }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
