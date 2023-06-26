import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupEventsComponent } from './lookup-events.component';

describe('LookupEventsComponent', () => {
  let component: LookupEventsComponent;
  let fixture: ComponentFixture<LookupEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookupEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
