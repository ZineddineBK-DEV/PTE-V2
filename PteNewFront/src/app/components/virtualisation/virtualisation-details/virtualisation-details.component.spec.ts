import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualisationDetailsComponent } from './virtualisation-details.component';

describe('VirtualisationDetailsComponent', () => {
  let component: VirtualisationDetailsComponent;
  let fixture: ComponentFixture<VirtualisationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualisationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualisationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
