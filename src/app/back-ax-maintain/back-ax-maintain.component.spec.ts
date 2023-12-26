import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackAxMaintainComponent } from './back-ax-maintain.component';

describe('BackAxMaintainComponent', () => {
  let component: BackAxMaintainComponent;
  let fixture: ComponentFixture<BackAxMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackAxMaintainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackAxMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
