import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualisationEventComponent } from './virtualisation-event.component';

describe('VirtualisationEventComponent', () => {
  let component: VirtualisationEventComponent;
  let fixture: ComponentFixture<VirtualisationEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualisationEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualisationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
