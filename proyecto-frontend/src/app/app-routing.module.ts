import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AsistenciaAlumnoComponent } from './components/asistencia-alumno/asistencia-alumno.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { EstadisticasComponent } from './components/entrenador/estadisticas/estadisticas.component';
import { PagoComponent } from './components/entrenador/pago/pago.component';
import { AlumnoFormComponent } from './components/gestion/alumno-form/alumno-form.component';
import { PlanFormComponent } from './components/gestion/plan-form/plan-form.component';
import { RutinaFormComponent } from './components/gestion/rutina-form/rutina-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PagoAlumnoComponent } from './components/pago-alumno/pago-alumno.component';
import { PlanComponent } from './components/plan/plan.component';
import { RutinaAlumnoComponent } from './components/rutina-alumno/rutina-alumno.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'alumno-form/:id',
    component: AlumnoFormComponent
  },
  {
    path: 'rutina-form/:asistencia',
    component: RutinaFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup/:persona',
    component: SignupComponent
  },
  {
    path: 'alumno',
    component: AlumnoComponent
  },
  {
    path: 'asistencia/:id',
    component: AsistenciaComponent
  },
  {
    path: 'asistencia-a/:id',
    component: AsistenciaAlumnoComponent
  },
  {
    path: 'rutina-a/:asistencia',
    component: RutinaAlumnoComponent
  },
  {
    path: 'estadistica',
    component:
      EstadisticasComponent
  },
  {
    path: 'plan',
    component: PlanComponent
  },
  
  {
    path: 'plan-form',
    component: PlanFormComponent
  },

  {
    path: 'pago',
    component: PagoComponent
  },
  {
    path: 'pago-a/:alumno',
    component: PagoAlumnoComponent
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
