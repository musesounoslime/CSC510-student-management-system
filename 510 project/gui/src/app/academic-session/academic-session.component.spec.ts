import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSessionComponent } from './academic-session.component';

describe('AcademicSessionComponent', () => {
  let component: AcademicSessionComponent;
  let fixture: ComponentFixture<AcademicSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
