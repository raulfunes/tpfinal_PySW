import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoAlumnoComponent } from './pago-alumno.component';

describe('PagoAlumnoComponent', () => {
  let component: PagoAlumnoComponent;
  let fixture: ComponentFixture<PagoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
