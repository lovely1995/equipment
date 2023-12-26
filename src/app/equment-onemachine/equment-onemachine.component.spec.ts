import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqumentOnemachineComponent } from './equment-onemachine.component';

describe('EqumentOnemachineComponent', () => {
  let component: EqumentOnemachineComponent;
  let fixture: ComponentFixture<EqumentOnemachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqumentOnemachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EqumentOnemachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
