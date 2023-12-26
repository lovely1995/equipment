import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontMaintainComponent } from './front-maintain.component';

describe('FrontMaintainComponent', () => {
  let component: FrontMaintainComponent;
  let fixture: ComponentFixture<FrontMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontMaintainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
