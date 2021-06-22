import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { AlumnoFormComponent } from './components/gestion/alumno-form/alumno-form.component';
import { RutinaFormComponent } from './components/gestion/rutina-form/rutina-form.component';
import { HomeComponent } from './components/home/home.component';

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
    path: 'alumno',
    component: AlumnoComponent
  }
  ,
  {
    path: 'asistencia/:id',
    component: AsistenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  

 }
