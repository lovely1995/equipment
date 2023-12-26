import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackMaintainComponent } from './back-maintain.component';

describe('BackMaintainComponent', () => {
  let component: BackMaintainComponent;
  let fixture: ComponentFixture<BackMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackMaintainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
