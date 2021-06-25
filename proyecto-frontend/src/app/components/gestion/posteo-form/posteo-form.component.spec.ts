import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteoFormComponent } from './posteo-form.component';

describe('PosteoFormComponent', () => {
  let component: PosteoFormComponent;
  let fixture: ComponentFixture<PosteoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosteoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
