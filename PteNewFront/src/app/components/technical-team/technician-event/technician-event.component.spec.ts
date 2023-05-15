import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianEventComponent } from './technician-event.component';

describe('TechnicianEventComponent', () => {
  let component: TechnicianEventComponent;
  let fixture: ComponentFixture<TechnicianEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
