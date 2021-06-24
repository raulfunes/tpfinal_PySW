import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaAlumnoComponent } from './rutina-alumno.component';

describe('RutinaAlumnoComponent', () => {
  let component: RutinaAlumnoComponent;
  let fixture: ComponentFixture<RutinaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutinaAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
