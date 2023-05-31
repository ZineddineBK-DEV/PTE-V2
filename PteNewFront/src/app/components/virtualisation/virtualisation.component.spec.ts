import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualisationComponent } from './virtualisation.component';

describe('VirtualisationComponent', () => {
  let component: VirtualisationComponent;
  let fixture: ComponentFixture<VirtualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
