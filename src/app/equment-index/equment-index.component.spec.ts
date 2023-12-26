import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqumentIndexComponent } from './equment-index.component';

describe('EqumentIndexComponent', () => {
  let component: EqumentIndexComponent;
  let fixture: ComponentFixture<EqumentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqumentIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EqumentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
